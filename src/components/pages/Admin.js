import React, { Component } from "react";
import "../../App.css";
import CardItem from "../CardItem";
import "../Poster.css";
import { variables } from "../../Variables.js";
export class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      modalTitle: "",
      ListingID: 0,
      Type: "",
      Price: "",
      Amenities: "",
      Link: "",
      PhotoFileName: "default.jpg",
      Location: "",
      Policy: "",
      Status: "",
      AvailableDate: "",
      PhotoPath: variables.PHOTO_URL,
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

  changeType = (e) => {
    this.setState({ Type: e.target.value });
  };

  changePrice = (e) => {
    this.setState({ Price: e.target.value });
  };

  changeAmenities = (e) => {
    this.setState({ Amenities: e.target.value });
  };

  changeLink = (e) => {
    this.setState({ Link: e.target.value });
  };

  changeLocation = (e) => {
    this.setState({ Location: e.target.value });
  };

  changePolicy = (e) => {
    this.setState({ Policy: e.target.value });
  };

  changeStatus = (e) => {
    this.setState({ Status: e.target.value });
  };

  changeAvailableDate = (e) => {
    this.setState({ AvailableDate: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Listing",
      ListingID: 0,
      Type: "",
      Price: "",
      Amenities: "",
      Link: "",
      PhotoFileName: "default.jpg",
      Location: "",
      Policy: "",
      Status: "",
      AvailableDate: "",
    });
  }

  editClick(list) {
    this.setState({
      modalTitle: "Edit Listing",
      ListingID: list.ListingID,
      Type: list.Type,
      Price: list.Price,
      Amenities: list.Amenities,
      Link: list.Link,
      PhotoFileName: list.PhotoFileName,
      Location: list.Location,
      Policy: list.Policy,
      Status: list.Status,
      AvailableDate: list.AvailableDate,
    });
  }

  createClick() {
    fetch(variables.API_URL + "Listings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Type: this.state.Type,
        Price: this.state.Price,
        Amenities: this.state.Amenities,
        Link: this.state.Link,
        PhotoFileName: this.state.PhotoFileName,
        Location: this.state.Location,
        Policy: this.state.Policy,
        Status: this.state.Status,
        AvailableDate: this.state.AvailableDate,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + "Listings", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ListingID: this.state.ListingID,
        Type: this.state.Type,
        Price: this.state.Price,
        Amenities: this.state.Amenities,
        Link: this.state.Link,
        PhotoFileName: this.state.PhotoFileName,
        Location: this.state.Location,
        Policy: this.state.Policy,
        Status: this.state.Status,
        AvailableDate: this.state.AvailableDate,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "Listings/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  // async deleteClick(id) {
  //   // console.log("value: " + JSON.stringify(this.state.recipe));
  //   const res = await fetch(variables.API_URL + "Listings/" + id, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log(res);
  //   if (res.status != 200) {
  //     window.alert("Please fill out all fields! ");
  //   } else {
  //     window.alert("Succesfully save new Recipe!");
  //   }
  //   console.log(id);
  // }

  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "listings/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ PhotoFileName: data });
      });
  };

  render() {
    const {
      listings,
      modalTitle,
      ListingID,
      Type,
      Price,
      Amenities,
      Link,
      PhotoFileName,
      Location,
      Policy,
      Status,
      AvailableDate,
      PhotoPath,
    } = this.state;

    return (
      <div>
        <div className="listings">
          <h1>ADMIN</h1>
          <p>Update Listings Information</p>
        </div>

        <div>
          <div className="posters__container">
            {/* <Button
            type="button"
              className="btns"
              buttonStyle="btn--filled"
              buttonSize="btn--large"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => this.addClick()}
            >
              ADD <i class="fas fa-plus"></i>
            </Button> */}
            <button
              // type="button"
              className="btn btn-primary m-2 float-end"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => this.addClick()}
            >
              Add <i class="fas fa-plus"></i>
            </button>
            <div className="posters__wrapper">
              <ul className="posters__items">
                {listings.map((list) => (
                  <div className="poster__item" key={list.ListingID}>
                    <div className="poster__picture">
                      <CardItem
                        src={PhotoPath + list.PhotoFileName}
                        text={`${list.Type} in ${list.Location}`}
                        label={list.Type}
                      />
                    </div>
                    <div className="poster__info">
                      <h3>
                        {list.Type} in {list.Location}
                      </h3>
                      <p>Available date: {list.AvailableDate}</p>
                      <p>Price: {list.Price}</p>
                      <p>Amenities: {list.Amenities}</p>
                      <div className="hero-btns">
                        <button
                          type="button"
                          className="btn btn-light mr-1"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => this.editClick(list)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="btn btn-light mr-1"
                          onClick={() => this.deleteClick(list.ListingID)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Property Type</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Type}
                        onChange={this.changeType}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Price</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Price}
                        onChange={this.changePrice}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Amenities</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Amenities}
                        onChange={this.changeAmenities}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Link</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Link}
                        onChange={this.changeLink}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Location</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Location}
                        onChange={this.changeLocation}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Policy</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Policy}
                        onChange={this.changePolicy}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Status</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Status}
                        onChange={this.changeStatus}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Available Date</span>
                      <input
                        type="date"
                        className="form-control"
                        value={AvailableDate}
                        onChange={this.changeAvailableDate}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={PhotoPath + PhotoFileName}
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    />
                  </div>
                </div>

                {ListingID === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {ListingID !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
