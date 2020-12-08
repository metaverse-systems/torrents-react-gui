import React, { Component } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import { Button, TextField } from '@material-ui/core';
import TorrentsAppHeader from "./TorrentsAppHeader";

const Torrent = (props) => {
  return <TableRow>
    <TableCell>{props.created_at}</TableCell>
    <TableCell>{props.name}</TableCell>
    <TableCell>{props.completed_at}</TableCell>
  </TableRow>;
}

class TorrentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torrents: [ 
      ],
      message: "",
      messageStyle: {
        border: 'thin dotted red',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: '200px',
        height: '100px',
        marginLeft: '-100px',
        marginTop: '-50px',
        left: '50%',
        top: '50%',
        paddingTop: '30px',
        display: 'none',
        backgroundColor: '#FFFFFF',
        position: 'absolute'
      }
    };
  }

  componentDidMount = () => {
    this.fetchList();
    setInterval(() => { this.fetchList() }, 30000);
  }

  fetchList = () => {
    const url = "/api/torrent";

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let torrents = [];
      data.forEach((torrent) => {
        torrents.push({
          created_at: torrent.created_at,
          completed_at: torrent.completed_at ? torrent.completed_at : "Downloading",
          name: torrent.name ? torrent.name : torrent.magnetURI,
          id: torrent.id
        });
      });
      this.setState({
        torrents: torrents
      });
    });
  }

  render() {
    return <div>
      <TorrentsAppHeader />
      <TableContainer>
        <Table aria-label="table">
          <TableHead>
            <TableRow key={"title"}>
              <TableCell colSpan={4} style={ {textAlign: 'center'} }>
                <h4>List of torrents</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.torrents.map((torrent, index) => <Torrent {...torrent} key={index} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <div id="message" style={this.state.messageStyle}>
        {this.state.message}
      </div>
    </div>
  }
};

export default TorrentList;
