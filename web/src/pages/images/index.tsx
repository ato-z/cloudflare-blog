import { ImageProp, imageListGet } from '@web/api/images';
import { useCallback, useEffect, useState, useTransition } from 'react';
import ImageItem from './components/ImageItem';
import { Button, Col, Row, Space } from 'antd';
import Loading from '@web/components/loading';

const column = 4;
const end = column * 5;

const ImagesList = () => {
  const [start, setStart] = useState(0);
  const [list, setList] = useState<Array<ImageProp>>([]);

  const [, startTransition] = useTransition();
  const fillContainer = useCallback(async () => {
    const { list } = await imageListGet({ start, end });
    startTransition(() => {
      list.forEach(img => {
        setList(originList => {
          const isIn = originList.find(i => i.id === img.id);
          isIn || originList.push(img);
          return originList;
        });
      });
    });
  }, [start, setList]);

  useEffect(() => {
    fillContainer();
  }, [start]);

  return (
    <Loading>
      <Row>
        {list.map(img => (
          <Col key={img.id}>
            <ImageItem img={img} />
          </Col>
        ))}

        <Col>
          <Space
            align="center"
            style={{ width: '100%', height: '100%', padding: '5px' }}
          >
            <Button
              type="primary"
              onClick={() => {
                setStart(cur => cur + end);
              }}
            >
              more
            </Button>
          </Space>
        </Col>
      </Row>
    </Loading>
  );
};

export default ImagesList;
