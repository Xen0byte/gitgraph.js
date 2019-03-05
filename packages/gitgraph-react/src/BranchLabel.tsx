import * as React from "react";
import { Commit } from "@gitgraph/core";

interface Props {
  commit: Commit<React.ReactElement<SVGElement>>;
  x: number;
  y: number;
}

interface State {
  textWidth: number;
  textHeight: number;
}

export class BranchLabel extends React.Component<Props, State> {
  public static readonly paddingX = 10;
  public static readonly paddingY = 5;
  public readonly state = { textWidth: 0, textHeight: 0 };

  private $text = React.createRef<SVGTextElement>();

  public componentDidMount() {
    const box = this.$text.current!.getBBox();
    this.setState({ textWidth: box.width, textHeight: box.height });
  }

  public render() {
    const { commit, x, y } = this.props;

    const radius = 10;
    const bgColor = "white";
    const boxWidth = this.state.textWidth + 2 * BranchLabel.paddingX;
    const boxHeight = this.state.textHeight + 2 * BranchLabel.paddingY;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect
          // TODO: re-introduce branch label style options
          stroke={commit.style.color}
          fill={bgColor}
          rx={radius}
          width={boxWidth}
          height={boxHeight}
        />
        <text
          ref={this.$text}
          fill={commit.style.color}
          style={{ font: commit.style.message.font }}
          alignmentBaseline="middle"
          x={BranchLabel.paddingX}
          y={boxHeight / 2}
        >
          {commit.branchToDisplay}
        </text>
      </g>
    );
  }
}
