import React from 'react';
import { Text, View, Image, Button,
         TextInput, ScrollView, TouchableHighlight
       } from 'react-native';
import axios from 'axios';
import request from 'superagent';

export default class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      content: [],
      text: '',
    };
    this.sendComment = this.sendComment.bind(this);
  }

  static navigationOptions = {
    title: 'Home',
  };

  sendComment() {
    if (this.state.text.length > 1) {
      const comment = this.state.text;
      const comments = this.state.comments;
      comments.push(comment);

      this.setState({
        comments,
      });

      request
        .post('https://react-eko.herokuapp.com/p/d')
        .type('form')
        .send({
          box: comment,
          id: this.state.id,
        }) // sends a JSON post body
        .set('Accept', 'application/json')
        .end(function (err, res) {
        // Calling the end function will send the request
      });
    }
  }

  render() {
    const res = this.props.navigation.state.params.post;
    return (
      <View
        style={styles.view}
      >
        <ScrollView>
          <Image
            style={{ width: 350, height: 350, }}
            source={{ uri: res.src }}
          />
          <TextInput
            style={{ height: 40, width: 260 }}
            placeholder="Type here to comment"
            onChangeText={(text) => this.setState({
              text, id: res._id, comments: res.comments,
            })}
          />
          <Button
            title="Send"
            onPress={this.sendComment}
          />
          {res.comments &&
            res.comments.map((comment, i) => {
              return (
                <Text
                  key={i}
                  style={styles.text}
                >{comment}</Text>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#eee',
    marginBottom: 20,
  },
  text: {
    padding: 10,
    textAlign: 'center',
  },
};
