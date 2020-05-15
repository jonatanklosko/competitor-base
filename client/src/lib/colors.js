import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';

const colorList = [...Object.values(lightBlue), ...Object.values(blue)];

export function getColor(index) {
  return colorList[index % colorList.length];
}
