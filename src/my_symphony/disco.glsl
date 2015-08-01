void main(void) {
  vec2 uv = (gl_FragCoord.xy / iResolution.xy); //wobble this?
  float thang = iProbs

  vec4 tex = texture2D(iChannel3,uv).x;

  uv =  uv + vec2[abs(sin(tex)) * 0.01, cos(tex) * 0.005]

  vec4 c1 = texture2D(iChannel0,uv).rgb;
  vec4 c2 = texture2D(iChannel1,uv).rgb;
  vec4 c3 = texture2D(iChannel2,uv).rgb;
  vec4 c4 = texture2D(iChannel3,uv).rgb;


  if(random() > thang){
    if((c1.r + c1.g + c1.b) / 3.0 < (0.66 * abs(tan(tex)))){
      gl_FragColor = c3;
    } else if ((c1.r + c1.g + c1.b) / 3.0 < 0.66 ){
      gl_FragColor = c2;
    } else {
      gl_FragColor = c4
    }
  } else {
    if(c1.r > (c1.g + c1.b)){
      gl_FragColor = vec4(c1.r, 0, 0, c1.a);
    } else if (c1.g > (c1.r + c1.b)){
      gl_FragColor = vec4(0, c1.g, 0, c1.a);
    } else if (c1.b > (c1.g + c1.r)){
      gl_FragColor = vec4(0, 0, c1.b, c1.a);
    } else {
      gl_FragColor = vec4(c1.r * abs(tan(tex)), c1.g * abs(cos(tex)), c1.b * abs(sin(tex)), c1.a)
    }
  }
  //fragColor = vec4(c1.r, c2.g, c1.b, c1.a);
}


// modulate=move the thing in directions
// the ocean.....
// yeah.



// IF R IS GREATER THAN G + B DRAW RED AT A SLIGHT OFFSET
// ELSE IF B IS GREAT THAN R + B DRAW BLUE AT A SLIGHT OFFSET
// AND SO FORTH!
