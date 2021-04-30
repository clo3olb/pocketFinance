import { useState } from "react";
import { Accordion, AccordionPanel, Box, Text } from "grommet";

type SideBarItemType = {
  title: string;
  value1?: string;
  value2?: string;
  //   link?: string;
};

const SideBarItem: React.FC<SideBarItemType> = (props) => {
  const { title, value1, value2 } = props;
  return (
    <Box
      pad="small"
      background="light-2"
      direction="row"
      align="center"
      className="sideBarItem"
    >
      <Box flex>
        {title && (
          <Text size="large" weight="bold">
            {title}
          </Text>
        )}
      </Box>
      {(value1 || value2) && (
        <Box align="end">
          {value1 && (
            <Text weight="bold" size="small">
              {value1}
            </Text>
          )}
          {value2 && <Text size="xsmall">{value2}</Text>}
        </Box>
      )}
    </Box>
  );
};

const SideBar = () => {
  const [activeIndexArray, setActiveIndexArray] = useState<number>(0);
  const handlePanelClick = (clickedIndexAsArray: number[]) => {
    const [clickedIndex] = clickedIndexAsArray;
    if (clickedIndex !== undefined) setActiveIndexArray(clickedIndex);
    console.log({ clickedIndex });
  };
  return (
    <Accordion activeIndex={activeIndexArray} onActive={handlePanelClick}>
      <AccordionPanel label="Stocks">
        <SideBarItem title="TSLA" value1="$139.23" value2="+$1.52" />
        <SideBarItem title="TSLA" value1="$139.23" value2="+$1.52" />
        <SideBarItem title="TSLA" value1="$139.23" value2="+$1.52" />
        <SideBarItem title="TSLA" value1="$139.23" value2="+$1.52" />
        <SideBarItem title="TSLA" value1="$139.23" value2="+$1.52" />
      </AccordionPanel>
    </Accordion>
  );
};

export default SideBar;
