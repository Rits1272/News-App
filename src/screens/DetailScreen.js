import React,{Component} from 'React';
import { Image, View, Alert} from 'react-native';
import { getArticles } from '../services/news';
import { WebView } from 'react-native-webview';

export default class DetailScreen extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {navigation} = this.props;
    const url = navigation.getParam('url');
    return(
      <WebView
        source={{uri:url}}
        style={{marginTop : 20}}
      />
    );
  }

}
