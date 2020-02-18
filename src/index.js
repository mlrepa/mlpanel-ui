import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(<Root />, MOUNT_NODE);
