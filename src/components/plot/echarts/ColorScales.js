import * as d3 from 'd3';

class ColorScale {
    static colorScales = {
        YlGnBu: d3.interpolateYlGnBu,
        Viridis: d3.interpolateViridis,
        Inferno: d3.interpolateInferno,
        Magma: d3.interpolateMagma,
        Plasma: d3.interpolatePlasma,
        Warm: d3.interpolateWarm,
        Cool: d3.interpolateCool,
        CubehelixDefault: d3.interpolateCubehelixDefault,
        BuGn: d3.interpolateBuGn,
        BuPu: d3.interpolateBuPu,
        GnBu: d3.interpolateGnBu,
        OrRd: d3.interpolateOrRd,
        PuBuGn: d3.interpolatePuBuGn,
        PuBu: d3.interpolatePuBu,
        PuRd: d3.interpolatePuRd,
        RdPu: d3.interpolateRdPu,
        YlGn: d3.interpolateYlGn,
        YlOrBr: d3.interpolateYlOrBr,
        YlOrRd: d3.interpolateYlOrRd,
        Turbo: d3.interpolateTurbo,
        Cividis: d3.interpolateCividis,
        Rainbow: d3.interpolateRainbow,
        Sinebow: d3.interpolateSinebow,
        Blues: d3.interpolateBlues,
        Greens: d3.interpolateGreens,
        Greys: d3.interpolateGreys,
        Purples: d3.interpolatePurples,
        Reds: d3.interpolateReds,
        Spectral: d3.interpolateSpectral,
        RdYlGn: d3.interpolateRdYlGn,
        RdYlBu: d3.interpolateRdYlBu,
        RdGy: d3.interpolateRdGy,
        RdBu: d3.interpolateRdBu,
        PiYG: d3.interpolatePiYG,
        PRGn: d3.interpolatePRGn,
        PuOr: d3.interpolatePuOr,
        BrBG: d3.interpolateBrBG
    };

    static getColorScale(colorScaleAttr, color1, color2, dataLength) {
        if (colorScaleAttr === 'custom') {
            return d3.scaleSequential(d3.interpolateRgb(color1, color2)).domain([0, dataLength - 1]);
        } else {
            return d3.scaleSequential(ColorScale.colorScales[colorScaleAttr] || d3.interpolateViridis).domain([0, dataLength - 1]);
        }
    }
}

export default ColorScale;