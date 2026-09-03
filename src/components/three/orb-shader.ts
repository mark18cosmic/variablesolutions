/**
 * GLSL for the hero orb.
 *
 * The vertex stage displaces an icosahedron along its normals using
 * 3D simplex noise, which is what gives the surface its slow liquid
 * roll. The fragment stage is pure maths — a fresnel rim mixed
 * through the brand ramp — so the scene needs no lights, no shadow
 * map and no environment texture, and stays a single draw call.
 *
 * Simplex noise is the standard Ashima / Stefan Gustavson
 * implementation (MIT).
 */

const simplex = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

export const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uPointer;

varying float vDisp;
varying vec3 vNormalW;
varying vec3 vViewDir;

${simplex}

void main() {
  // Two octaves: a slow swell plus a finer ripple.
  float n1 = snoise(position * 1.15 + vec3(0.0, uTime * 0.16, 0.0));
  float n2 = snoise(position * 2.7 - vec3(uTime * 0.11, 0.0, uTime * 0.07));
  float disp = (n1 * 0.75 + n2 * 0.25) * uAmp * (1.0 + uPointer * 0.35);

  vDisp = disp;

  vec3 displaced = position + normal * disp;
  vec4 world = modelMatrix * vec4(displaced, 1.0);

  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - world.xyz);

  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const orbFragment = /* glsl */ `
uniform vec3 uMint;
uniform vec3 uBlue;
uniform vec3 uViolet;
uniform float uTime;

varying float vDisp;
varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  vec3 n = normalize(vNormalW);
  vec3 v = normalize(vViewDir);

  // Fresnel: ~0 facing the camera, ~1 at the silhouette.
  float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.4);

  // Crests of the noise glow; troughs fall away. This is what gives
  // the surface visible flow rather than a flat disc of colour.
  float energy = smoothstep(-0.10, 0.14, vDisp);

  vec3 base = mix(uBlue, uMint, energy);
  base = mix(base, uViolet, smoothstep(0.55, 1.0, energy) * 0.7);

  // Brightness is carried almost entirely by the rim, so the object
  // reads as a lit glass shell rather than a solid ball.
  vec3 color = base * (0.35 + fres * 2.4) + uMint * pow(fres, 8.0) * 0.9;

  // Likewise the alpha: the centre stays near-invisible so the
  // headline in front of it never loses contrast.
  float alpha = (0.06 + energy * 0.16) + pow(fres, 2.2) * 0.8;

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));
}
`;
