import React, { Component } from "react";
import "../../App.css";
import CardItem from "../CardItem";
import "../Poster.css";
import { Button } from "../Button";
import Poster from "../Poster";
import { variables } from "../../Variables.js";
import SlideShow from "../SlideShow";
// function Listings() {
//   return (
//     <div>
//       <div className="listings">
//         <h1>LISTINGS</h1>
//         <p>Current and Future Available Accomodations</p>
//       </div>
//       <Poster />
//     </div>
//   );
// }
// export default Listings;

export class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
    };
  }

  refreshList() {
    fetch(variables.API_URL + "Listings")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ listings: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { listings } = this.state;

    const data = [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
        caption: "San Francisco",
      },
      {
        image:
          "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
        caption: "Scotland",
      },
      {
        image:
          "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
        caption: "Darjeeling",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
        caption: "San Francisco",
      },
      {
        image:
          "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
        caption: "Scotland",
      },
    ];

    return (
      <div>
        <div className="listings">
          <h1>LISTINGS</h1>
          <p>Current and Future Available Accomodations</p>
        </div>

        <div>
          <div className="posters__container">
            <div className="posters__wrapper">
              <ul className="posters__items">
                {listings.map((list) => (
                  <div className="poster__item" key={list.ListingID}>
                    {/* <div className="poster__picture">
                      <CardItem
                        src={variables.PHOTO_URL + list.PhotoFileName}
                        text={`${list.Type} in ${list.Location}`}
                        label={list.Type}
                      />
                    </div> */}
                    <SlideShow data={data} />
                    <div className="poster__info">
                      <h3>
                        {list.Type} in {list.Location}
                      </h3>
                      <p>
                        <i class="fas fa-map-marker-alt"></i> {list.Location}
                      </p>
                      <p>Available date: {list.AvailableDate}</p>
                      <p>Price: {list.Price}</p>
                      <p>Amenities: {list.Amenities}</p>
                      <p>Policy: {list.Policy}</p>
                      <div className="hero-btns">
                        {/* <Button
                          className="btns"
                          buttonStyle="btn--primary"
                          buttonSize="btn--medium"
                        >
                          LEARN MORE <i class="fas fa-info-circle"></i>
                        </Button> */}
                      </div>
                      <a
                        href={list.Link}
                        target="_blank"
                        style={{ marginLeft: "65%" }}
                      >
                        <button className="btn btn--primary btn--medium">
                          APPLY NOW <i class="fas fa-edit"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
