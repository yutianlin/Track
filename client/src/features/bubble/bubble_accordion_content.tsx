import React from "react";
import Typography from "@material-ui/core/Typography";
import {BubbleInfo} from "../../model/bubble_info";

interface BubbleAccordionContentProps {
  bubble: BubbleInfo
}

export default function BubbleAccordionContent({ bubble }: BubbleAccordionContentProps) {
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
    </div>
  )
}