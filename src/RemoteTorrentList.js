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

const RemoteTorrent = (props) => {
  return <TableRow>
    <TableCell></TableCell>
    <TableCell>{props.address}</TableCell>
    <TableCell>{props.type}</TableCell>
    <TableCell>
       <Button color="secondary" variant="outlined" size="small" onClick={() => props.deleteRemoteTorrent(props.id)}>
         Delete
       </Button>
    </TableCell>
  </TableRow>;
}

const RemoteTorrentNew = (props) => {
  return <TableRow>
    <TableCell>
      Add new torrent daemon
    </TableCell>
    <TableCell>
      <label htmlFor="address" style={ {marginRight: 5} }>Address:Port</label>
      <TextField id="address" />
    </TableCell>
    <TableCell>
      <label htmlFor="type" style={ {marginRight: 5} }>Type:</label>
      <select id="type" label="Type">
        {props.remoteTypes.map((remoteType) => {
          return <option>{remoteType}</option>;
        })}
      </select>
    </TableCell>
    <TableCell>
      <Button color="primary" variant="outlined" size="small" onClick={() => props.saveRemoteTorrent() }>
        Add
      </Button>
    </TableCell>
  </TableRow>;
}

class RemoteTorrentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remoteTorrents: [ 
      ],
      remoteTypes: [
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
    const url = "/api/remotetorrent";

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let remotetorrents = [];
      data.remoteTorrents.forEach((remotetorrent) => {
        remotetorrents.push({
          address: remotetorrent.address,
          type: remotetorrent.type,
          id: remotetorrent.id
        });
      });
      this.setState({
        remoteTorrents: remotetorrents,
        remoteTypes: data.remoteTorrentTypes
      });
    });
  }

  saveRemoteTorrent = () => {
    const address = document.getElementById('address').value;
    const type = document.getElementById('type').value;
    document.getElementById('address').value = "";
    document.getElementById('type').value = "";
    const url = "/api/remotetorrent";
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      credentials: "same-origin",
      body: JSON.stringify({ address: address, type: type })
    }).then((response) => response.json())
    .then((data) => {
      this.fetchList();
    });

  }

  deleteRemoteTorrent = (td) => {
    const url = "/api/remotetorrent/" + td;
    fetch(url, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      },
      credentials: "same-origin",
    }).then((response) => response.json())
    .then((data) => {
      this.fetchList();
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
                <h4>Torrent daemons</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <RemoteTorrentNew saveRemoteTorrent={this.saveRemoteTorrent} remoteTypes={this.state.remoteTypes} />
            {this.state.remoteTorrents.map((remotetorrent, index) => 
              <RemoteTorrent {...remotetorrent} key={index} deleteRemoteTorrent={this.deleteRemoteTorrent} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <div id="message" style={this.state.messageStyle}>
        {this.state.message}
      </div>
    </div>
  }
};

export default RemoteTorrentList;
