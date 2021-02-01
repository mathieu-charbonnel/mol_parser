import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

const EditForm = ({ handleChange, newRecord }) => (
	<Fragment>

		<TextField
            id="record-molecule"
            type='text'
            label="Formula"
            name="molecule"
            margin="dense"
            placeholder="Formula"
            value={newRecord.artist}
            onChange={handleChange}
            fullWidth
		/>
	</Fragment>
)

export default (EditForm);
