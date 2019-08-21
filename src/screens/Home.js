import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Alert} from 'react-native';
import {Container, Header, Body, Title, Content, List, ListItem, Button} from 'native-base';
import ListDataItem from '../components/list_item';
import { getArticles } from '../services/news';
import DetailScreen from '../screens/DetailScreen';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      data : null,
      isError : false
    }
  }

  componentDidMount() {
      getArticles().then(data => {
          this.setState({
              isLoading: false,
              data: data
          })
      }, error => {
          Alert.alert("Error", "Something happend, please try again")
      })
  }

  render() {
      const {navigate} = this.props.navigation;
         let view = this.state.isLoading ? (
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
                 <Text style={{ marginTop: 8 }} children="Please wait..." />
             </View>
         ) : (
                 <List
                     dataArray={this.state.data}
                     renderRow={(item) => {
                         return (
                           <View>
                            <ListItem>
                                <ListDataItem data={item} />
                             </ListItem>
                            <Button full onPress={() => navigate('DetailScreen', {
                              url:item.url
                            })}
                            >
                              <Text style={{color:'#fff'}}>Read Full News</Text>
                            </Button>
                           </View>
                         )
                     }} />

             )
         return (
             <Container>
                 <Header>
                     <Body>
                         <Title children="RITIK NEWS APP" />
                     </Body>
                 </Header>
                 <Content
                     contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
                     padder={false}>
                         {view}
                 </Content>
             </Container>
         )
     }
 }
