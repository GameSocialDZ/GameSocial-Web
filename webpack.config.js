const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const webpack = require("webpack");

const envConfig = require('./env.config');

const env = process.env.NODE_ENV || 'dev';
