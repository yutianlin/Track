import React from "react";
import Typography from "@material-ui/core/Typography";
import {BubbleInfo} from "../../model/bubble_info";
import {Button} from "@material-ui/core";

interface BubbleAccordionContentProps {
  bubble: BubbleInfo,
  canDelete: boolean,
  onDelete: (bubble: BubbleInfo) => any
}

export default function BubbleAccordionContent({ bubble, canDelete, onDelete }: BubbleAccordionContentProps) {
  return (
    <div style = {{display: 'flex', flexDirection: 'column'}}>
      <Typography style = {{marginBottom: '2vh'}}>
        {bubble.description}
      </Typography>
      <Typography color="textSecondary">
        Bubble Id: {bubble.bubble_id}
      </Typography>
      <Typography color="textSecondary">
        Person Count: {bubble.count}
      </Typography>
      {canDelete &&
      (<Button
          size="small"
          style={{marginTop: '2vh'}}
          onClick={() => onDelete(bubble)}>
          Delete Bubble
        </Button>
      )}
    </div>
  )
}