// From ChatGPT
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;   //1. 首先，函数将RGB值规范化到[0,1]区间；
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);    //2. 然后，计算RGB颜色中的最大值（max）和最小值（min）；
    var hue, saturation,
        lightness = (max + min) / 2;    //3. 明度（L）被计算为 (max + min) / 2；
    if (max === min) {
        hue = saturation = 0; // achromatic
    } else {
        var diff = max - min;
        saturation = lightness > 0.5 ?   //4. 饱和度（S）的计算取决于明度：
            diff / (2 - max - min)      //否则，饱和度等于 (max - min) / (2.0 - max - min)；
            :
            diff / (max + min);     //如果明度小于0.5，饱和度等于 (max - min) / (max + min)，
        switch (max) {      //5. 色相（H）的计算则依赖于R、G和B哪个是最大值。
            case r:     //如果R是最大值，则H = (G - B) / (max - min)；
                hue = (g - b) / diff + (g < b ? 6 : 0); break;
            case g:     //如果G是最大值，则H = 2.0 + (B - R) / (max - min)；
                hue = (b - r) / diff + 2; break;
            case b:     //如果B是最大值，则H = 4.0 + (R - G) / (max - min)。
                hue = (r - g) / diff + 4; break;
        }
        hue /= 6;     //接下来将H除以6以规范化到[0,1]区间。
    }
    return [hue, saturation, lightness];
}

function hslToRgb(hue, saturation, lightness) {    //此算法的效果会因色彩空间的选择而有所不同。例如，Adobe RGB、sRGB 和 Apple RGB 都是 RGB 色彩空间，但每种空间对色彩的解读和表示都有所差异。此算法假设色彩空间是sRGB。
    var r, g, b;
    if (saturation === 0) {   //1. 当饱和度（S）等于0时，颜色是无色的（灰度色），此时的RGB值都等于明度（L）；
        r = g = b = lightness; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {   //Hue 在颜色学中通常是指彩色的基本属性，也就是色相。
            if (t < 0) { t += 1 };      // - 如果t小于0则t+1；
            if (t > 1) { t -= 1 };      // - 如果t大于1则t-1；
            if (t < 1 / 6) { return p + (q - p) * 6 * t };      // - 如果t小于1/6则RGB值为p+(q-p)*6*t；
            if (t < 1 / 2) { return q };    // - 如果t在1/6到1/2之间，则RGB值为q；
            if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6 };    // - 如果t在1/2到2/3之间，则RGB值为p+(q-p)*(2/3-t)*6；
            return p;   // - 其他情况RGB值为p；
        };
        // 2. 当饱和度不为0时，需要先计算两个临时变量：
        var q = lightness < 0.5 ?    //第一个临时变量q的计算依赖于明度L是否小于0.5，
            lightness * (1 + saturation)     //如果L小于0.5则q=L(1+S)，
            :
            lightness + saturation - lightness * saturation;  //否则q=L+S-L*S；
        var p = 2 * lightness - q;   //第二个临时变量p等于2L-q；
        // 3. 然后，对于R、G、B三种颜色，分别计算它们在HSL颜色模型下对应的色相值t，并计算RGB值：
        r = hue2rgb(p, q, hue + 1 / 3);   //R对应t为H+1/3，
        g = hue2rgb(p, q, hue);   //G对应t为H，
        b = hue2rgb(p, q, hue - 1 / 3);   //B对应t为H-1/3
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];     //4. 上述各步骤计算得到的RGB值为0到1之间的数值，如果要转化为实际的RGB值，需要再乘以255。
}

export {
    rgbToHsl,
    hslToRgb
};