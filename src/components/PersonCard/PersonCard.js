import { Component } from "react";
import { Card, Skeleton } from "antd";

import { list } from "../../helper";
const { Meta } = Card;




class PersonCard extends Component {
  skeletonMap = () => {
    let i = 0;
    while (i < 20) {
      return (
        <div className="col-lg-3 mb-5">
          <Skeleton active avatar></Skeleton>
        </div>
      );
      i += 1;
    }
  };

  render() {
    const { personList, profileDetail } = this.props;
    const skeletonList = list(20)
    return (
      <>
        {personList.length ? (
          personList.map((item) => (
            <div className="col-lg-3 my-5 col-md-6 col-xs-12" key={item.id}>
              <Card
                onClick={() => profileDetail(item.id, item.known_for)}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={item.image} />}
              >
                <Meta title={item.name} />
              </Card>
            </div>
          ))
        ) : (
          <>
          {
            skeletonList.map(i => <div key={i} className="col-lg-3 mb-5">
            <Skeleton active avatar></Skeleton>
          </div>)
          }
          
          </>
        )}
      </>
    );
  }
}

export default PersonCard;
