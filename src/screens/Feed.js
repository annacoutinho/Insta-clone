import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect, useSelector } from "react-redux";
import Header from "../components/Header";
import Post from "../components/Post";
import { firebase } from "../lib/firebaseConfig";

const Feed = () => {
  const { posts } = useSelector((state) => state.posts) ?? [];

  const loadPostsFromFirebase = useCallback(() => {
    const postsRef = firebase.database().collection("posts");

    console.log("ref posts agora", postsRef);
  });

  useEffect(() => {
    loadPostsFromFirebase();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={posts}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <Post key={item.id} {...item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

//export default Feed

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts.posts,
  };
};

export default connect(mapStateToProps)(Feed);
