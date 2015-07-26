// uses iChannel0 for fft
uniform float iOvertoneVolume;

// find the magnitude of hz in the FFT.  range is 0..1(ish)
float hz(float hz)
{
  float u = hz/22050.0;
  return texture2D(iChannel0,vec2(u,0.25)).x;
}

void main(void)
{
  vec2 uv = 2.0*(gl_FragCoord.xy/iResolution.xy) - 1.0;
  uv.x *= iResolution.x/iResolution.y;  // fix aspect ratio

  // 3 dancing magenta, cyan & yellow sine waves
  float v1 = 0.1 + 2.0*iOvertoneVolume;
  float v2 = 0.1 + 100.15*hz(10);
  float v3 = 0.1 + 12.25*hz(70);
  vec3 col = vec3(0.0, 1.0, 0.0);
  float v1x = uv.x + sin(5.0*iGlobalTime + 1.5*uv.y)*v1;
  float v2x = uv.x + 10.5 + sin(1.0*iGlobalTime + 0.8*uv.y)*v1;
  float v3x = uv.x - 20.15 + sin(1.0*iGlobalTime + 15.2*uv.y)*v1;
  col += vec3(1.0,2.0,1.0) * abs(0.166/v1x) * v1;
  col += vec3(1.0,1.0,0.7) * abs(0.266/v2x) * v2;
  col += vec3(1.0,1.5,1.0) * abs(0.166/v3x) * v3;

  // with a lighted disco floor pattern
  float uvy2 = 0.25*iGlobalTime-uv.y;
  float a1 = max(0.0,0.5*hz(2000)) *
    max(0.0,min(9.0,sin(25.0*uv.x)*sin(10.0*uvy2)));
  col += vec3(1.0,12.0,1000.0) * a1;

  gl_FragColor = vec4(col,12.0);
}
