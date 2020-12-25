import { Gauge } from '../../../../src';
import { DEFAULT_COLOR } from '../../../../src/plots/gauge/constant';
import { createDiv } from '../../../utils/dom';

describe('gauge', () => {
  it('gauge', async () => {
    const color = ['#F4664A', '#FAAD14', '#30BF78'];
    const getColor = (percent) => {
      return percent < 0.4 ? color[0] : percent < 0.6 ? color[1] : color[2];
    };
    const gauge = new Gauge(createDiv(), {
      percent: 0.2,
      range: {
        color: getColor,
      },
    });

    gauge.render();
    // @ts-ignore
    expect(typeof gauge.chart.views[1].geometries[0].attributeOption.color).toBe('object');
    expect(gauge.chart.views[1].geometries[0].elements[0].shape.attr('fill')).toBe(color[0]);
    expect(gauge.chart.views[1].geometries[0].elements[1].shape.attr('fill')).toBe(DEFAULT_COLOR);

    gauge.changeData(0.45);
    expect(gauge.chart.views[1].geometries[0].elements[0].shape.attr('fill')).toBe(color[1]);
    expect(gauge.chart.views[1].geometries[0].elements[1].shape.attr('fill')).toBe(DEFAULT_COLOR);

    gauge.changeData(0);
    expect(gauge.chart.views[1].geometries[0].elements[0].shape.attr('fill')).toBe(color[0]);
    expect(gauge.chart.views[1].geometries[0].elements[1].shape.attr('fill')).toBe(DEFAULT_COLOR);

    gauge.changeData(1);
    expect(gauge.chart.views[1].geometries[0].elements[0].shape.attr('fill')).toBe(color[2]);
    expect(gauge.chart.views[1].geometries[0].elements[1]).toBeUndefined();
  });
});
