import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

export interface DieProps {
  index: number;
  selected: boolean
  img: string;
  clickDie: (index: number) => void;
}

export const Die: Devvit.BlockComponent<DieProps> = (
  {
    index,
    selected,
    img,
    clickDie
  },
  context
) => {

  const postWidth = Number(context.dimensions?.width);
  const imgSize = postWidth < 500 ? "55px" : "72px";
  const borderContainerSize = postWidth < 500 ? "63px" : "80px";

  return (
    <zstack alignment="center middle">

      <vstack 
        height={borderContainerSize}
        width={borderContainerSize}
        cornerRadius="medium"
        backgroundColor={selected ? "lightslategray" : Colors.darkBlue}
      />
      <vstack
        height={imgSize}
        width={imgSize}
        alignment="center middle"
        cornerRadius="medium"
        backgroundColor={Colors.whiteAlt}
        onPress={img.includes('0') ? undefined : () => clickDie(index)}
        
      >
        <image
          url={img}
          imageHeight={imgSize}
          imageWidth={imgSize}
          height={imgSize}
          width={imgSize}
          maxHeight="100%"
          maxWidth="100%"
        />
      </vstack>
    </zstack>
  );
}
