import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface InfoModalProps {
  showModal: boolean;
  header: string;
  body: string;
  btnText: string;
  clickClose: () => void;
}

export const InfoModal: Devvit.BlockComponent<InfoModalProps> = (
  {
    showModal,
    header,
    body,
    btnText,
    clickClose
  }
) => {

  if(showModal){
    return(
      <zstack width="100%" height="100%" alignment="center middle">

        <vstack width="100%" height="100%" backgroundColor={Colors.disabled}/>

        <vstack width="315px" cornerRadius="small" backgroundColor={Colors.whiteAlt} borderColor={Colors.gray} border="thick">
          
          <hstack padding="small" width="100%">
            <vstack width="90%" alignment="start top">
              <text size="xlarge" weight="bold" style="heading" color={Colors.blackAlt}>
                {header}
              </text>
            </vstack>
            <vstack width="10%" alignment="end top">
              <icon name="close" size="small" color={Colors.gray} onPress={clickClose} />
            </vstack>
          </hstack>

          <vstack width="100%" height="1px" backgroundColor={Colors.lightGray} />

          <vstack padding="medium">
            <text width="100%" alignment="start middle" color={Colors.blackAlt} wrap>
              {body}
            </text>
          </vstack>

          <vstack width="100%" height="1px" backgroundColor={Colors.lightGray} />

          <hstack padding="small" gap="medium" width="100%" alignment="end middle">
            <vstack
              minWidth="55px" 
              backgroundColor={Colors.blue}
              padding="small"
              cornerRadius="small"
              alignment="center middle"
              onPress={clickClose}
            >
              <text size="large" color={Colors.whiteAlt}>
                {btnText}
              </text>
            </vstack>
          </hstack>
        </vstack>
      </zstack>
    )
  }

  return(
    <vstack/>
  );
}
