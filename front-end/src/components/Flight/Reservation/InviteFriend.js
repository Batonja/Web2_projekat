import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class InviteFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsNames: [],
      selectedFriend: this.props.friends[0],
      allFriends: this.props.friends,
    };
  }

  componentDidMount() {
    const friendsFullNames = [];
    this.props.friends.forEach((friend) => {
      this.props.allUsers.forEach((user) => {
        if (friend === user.Email) {
          friendsFullNames.push(user.FirstName + " " + user.LastName);
        }
      });
    });
    this.setState({ friendsNames: friendsFullNames });
    this.props.sendSelectedFriend(this.state.selectedFriend.friendOf.email);
  }

  onHandleChange = (event) => {
    this.setState({ selectedFriend: event.target.value });
    this.props.sendSelectedFriend(event.target.value);
  };

  /*isFriendAlreadyFlying = (friend) => {
    for (var index = 0; index < this.props.passengers.length; index++) {
      if (this.props.passengers[index].Email === friend) {
        if (this.state.selectedFriend === this.props.passengers[index].Email) {
          for (
            var indexNextFriend = 0;
            indexNextFriend < this.state.allFriends.length;
            indexNextFriend++
          ) {
            if (this.state.allFriends[indexNextFriend] !== friend) {
              this.setState({
                selectedFriend: this.state.allFriends[indexNextFriend],
              });
            }
          }
        }
        return true;
      }
    }
    return false;
  };*/

  getSelectedFriend = () => {
    return this.state.selectedFriend;
  };

  removeInvitedFriend = () => {
    var firstSelectedFriend = this.state.selectedFriend;
    var indexToDelete = -1;
    for (var index = 0; index < this.state.allFriends.length; index++) {
      if (
        this.state.allFriends[index].friendOf.email ===
        this.state.selectedFriend.email
      ) {
        indexToDelete = index;
        this.setState({
          selectedFriend: this.state.allFriends[
            (index + 1) % this.state.allFriends.length
          ],
        });
        break;
      }
    }
    var friends = Array.from(this.state.allFriends).filter(
      (item) => item !== firstSelectedFriend
    );
    var friendsNames = Array.from(this.state.friendsNames).filter(
      (name, index) => index !== indexToDelete
    );

    this.setState({ allFriends: friends, friendsNames: friendsNames });
  };

  render() {
    return (
      <>
        <Select
          value={this.state.selectedFriend}
          onChange={(e) => this.onHandleChange(e)}
        >
          {Array.from(this.state.allFriends).map((friend, i) => {
            return (
              <MenuItem value={friend}>
                {friend.friendOf.firstName + "(" + friend.friendOf.email + ")"}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  }
}

export default InviteFriend;
