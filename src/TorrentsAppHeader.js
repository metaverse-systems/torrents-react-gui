import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import { Button, TextField } from '@material-ui/core';

const TorrentsAppHeader = (props) => {
    return <div>
      <TableContainer>
        <Table aria-label="table">
          <TableHead>
            <TableRow key={"title"}>
              <TableCell colSpan={4} style={ {textAlign: 'center'} }>
                <h4>Torrents</h4>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} style={ {textAlign: 'center'} }>
                <a href="/torrents/torrents"><Button color="primary" variant="contained">List of torrents</Button></a>
              </TableCell>
              <TableCell colSpan={2} style={ {textAlign: 'center'} }>
                <a href="/torrents/remotetorrents"><Button color="primary" variant="contained">Torrent daemons</Button></a>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>;
}

export default TorrentsAppHeader;
