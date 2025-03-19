import React, { useState } from "react";

import styled from "styled-components";
import Draggable from "react-draggable";
import { Button, Card, Input } from "antd";

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Layout = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const DraggableItem = styled.div`
  width: 60px;
  height: 60px;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

const DraggableItemList = styled.div`
  display: flex;
  gap: 10px;
`;

const Board = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`;

const initialObjects = [
  {
    id: "table",
    url: "https://img2.freepng.ru/lnd/20240425/zow/aazjgfixb.webp",
  },
  {
    id: "chair",
    url: "https://img.freepik.com/premium-photo/office-chair-top-view-modern-designer-furniture-chair-isolated-white-background_2239-10497.jpg?w=1060",
  },
  {
    id: "flower",
    url: "https://img.freepik.com/premium-vector/illustration-house-plant-pot_484720-163.jpg?w=1060",
  },
];

const Planning = () => {
  const [layout, setLayout] = useState([]);

  const handleDrop = (e, id, url) => {
    const newObject = {
      id: `${id}-${Date.now()}`,
      type: id,
      url: url,
      x: 0,
      y: 0,
    };
    setLayout((prev) => [...prev, newObject]);
  };

  const onStop = (_, data) => (id) => {
    const result = layout.map((it) =>
      it.id === id ? { ...it, x: data.x, y: data.y } : it
    );
    setLayout(result);
  };

  const saveLayout = () => {
    const blob = new Blob([JSON.stringify(layout)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "layout.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadLayout = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const loadedLayout = JSON.parse(e.target.result);
      setLayout(loadedLayout);
    };
    reader.readAsText(file);
  };

  const draggableItems = (
    <>
      {initialObjects.map(({ id, url }) => (
        <DraggableItem
          key={id}
          draggable
          onDragEnd={(e) => handleDrop(e, id, url)}>
          <img alt={id} src={url} />
        </DraggableItem>
      ))}
    </>
  );

  const board = (
    <Board>
      {layout.map((it) => (
        <Draggable
          key={it.id}
          defaultPosition={{ x: it.x, y: it.y }}
          bounds="parent"
          onStop={(e, data) => onStop(e, data)(it.id)}>
          <DraggableItem>
            <img alt={it.id} src={it.url} />
          </DraggableItem>
        </Draggable>
      ))}
    </Board>
  );

  return (
    <Container>
      <Card title="Select object">
        <Layout>
          <DraggableItemList>{draggableItems}</DraggableItemList>
          <Actions>
            <Button type="primary" onClick={saveLayout}>
              Save
            </Button>
            <Input type="file" onChange={loadLayout} />
          </Actions>
        </Layout>
      </Card>
      <Card title="Board" style={{ width: "100%" }}>
        {board}
      </Card>
    </Container>
  );
};

export default Planning;
