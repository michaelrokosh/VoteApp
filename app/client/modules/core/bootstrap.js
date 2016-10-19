import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts';
import NotificatorComponent from './components/layouts/notificator/notificator_component.jsx';

export const HIGHCHARTS_COLORS = [
  '#43A047', 
  '#F44336', 
  '#EC407A', 
  '#9C27B0', 
  '#673AB7',
  '#FF5722', 
  '#3F51B5', 
  '#2196F3', 
  '#009688', 
  '#795548', 
  '#607D8B',
  '#E040FB',
  '#2196F3',
  '#EF6C00',
  '#6D4C41',
  '#757575'
];

export const bootstrap = () => {    
  Meteor.startup(function () {
    Highcharts.setOptions({
      colors: HIGHCHARTS_COLORS,
      chart: {
        style: {
          fontFamily: 'sans-serif'
        }
      }
    });
  });
}