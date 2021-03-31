import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';

import {
    Table,
    Button,
    UncontrolledTooltip
} from './../../../../components';
import classes from './common.scss';
import {
    getFileIcon
} from './../utilities';
import {isAdmin} from '../../../../utilities/admin';
import fileDownload from 'js-file-download';

const handleDownload = (url, filename) => {
    fetch(url).then(function (response){
        return response.blob();
    }).then((res) => {
        console.log(res);
      fileDownload(res, filename)
    })
}

export const FilesList = ({ files, onDeleteFile, admin }) => (
    <Table responsive hover className="mt-3">
        <thead>
            <tr>
                <th className="bt-0"></th>
                <th className="bt-0">File Name</th>
                <th className="bt-0">Modified Date</th>
                <th className="bt-0 text-right">Actions</th>
            </tr>
        </thead>
        <tbody>
        {
            _.map(files, (file, index) => (
                <tr key={ index }>
                    <td className="align-middle">
                        <img width="50" heigth="50" src={file.url} alt={file.name} />
                        {/*<div className={ classes['ph--small'] }>
                            <i className={`fa fa-fw fa-2x ${getFileIcon(file)}`} />
            </div>*/}
                    </td>
                    <td className="align-middle">
                        { file.name }
                    </td>
                    <td className="align-middle">
                        { moment(file.modifiedDate || file.created_at).format('DD-MMM-YYYY, HH:mm') }
                    </td>
                    <td className="text-right align-middle">
                        {admin ? <Button
                            color="link"
                            onClick={() => {onDeleteFile(file)}}
                            size="sm"
                            id={`delete-file-${index}`}
                        >
                            <i className="fa fa-times fa-fw text-danger"></i>
                        </Button> : 
                        <Button
                            color="link"
                            onClick={() => {handleDownload(file.url, file.name)}}
                            size="sm"
                            id={`download-file-${index}`}
                        >
                        <i className="fa fa-times fa-download"></i></Button>}
                    </td>
                </tr>
            ))
        }
        </tbody>
    </Table>
);

FilesList.propTypes = {
    files: PropTypes.array,
    onDeleteFile: PropTypes.func
}