import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Alert
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { addPost } from '../store/actions/posts'

const noUser = 'Você precisa estar ogado para adicionar imagens'
class AddPhoto extends Component {
  state = {
    image: null,
    comment: ''
  }

  pickImage = async () => {
    if(!this.props.name) {
      Alert.alert('Falha!', noUser)
      return
    }
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        alert('Desculpe, precisamos das permissões da câmera para prosseguir')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })

      if (!result.cancelled) {
        const firstImageUri =
          result.assets && result.assets.length > 0
            ? result.assets[0].uri
            : null
        if (firstImageUri) {
          this.setState({ image: { uri: firstImageUri } })
        } else {
          console.warn('Nenhuma imagem foi capturada.')
        }
      }
    } catch (error) {
      alert('Erro ao tentar capturar a foto.')
    }
  }

  save = async () => {
    if(!this.props.name){
      Alert.alert('Falha!', noUser)
      return
    }
    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      comments: [
        {
          nickname: this.props.name,
          comments: this.state.comment
        }
      ]
    })
    this.setState({ image: null, comment: '' })
    this.props.navigation.navigate('Feed')
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Compartilhe uma imagem</Text>
          <View style={styles.imageContainer}>
            <Image
              key={this.state.image?.uri}
              source={this.state.image}
              style={styles.image}
            />
          </View>
          <TouchableOpacity onPress={this.pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Escolha a foto</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Algum comentário para a foto?"
            style={styles.input}
            value={this.state.comment}
            editable={this.props.name}
            onChangeText={comment => this.setState({ comment })}
          />
          <TouchableOpacity
            onPress={this.save}
            style={[
              styles.button,
              this.props.loading ? styles.buttonDisabled : null
            ]}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#EEE',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center'
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4'
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF'
  },
  input: {
    marginTop: 20,
    width: '90%'
  },
  buttonDisabled: {
    backgroundColor: '#AAA'
  }
})

//export default AddPhoto

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)
