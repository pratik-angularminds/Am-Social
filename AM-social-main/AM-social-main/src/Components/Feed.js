import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "@mui/material/Link";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  List,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  CardHeader,
  Button,
} from "@mui/material";
import Header from "./Header";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Feed() {
  let navigate = useNavigate();
useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("token")) === null ||
      JSON.parse(localStorage.getItem("user")) === null
    ) {
      navigate("/login");
    }
    
}, [])

  const [expanded, setExpanded] = React.useState(false);
  const [id, setId] = useState(-1);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user"))
  );
  const [viewComments, setViewComments] = useState(false);
  const [data2, setData2] = useState([]);
  const [limit, setlimit] = useState(3);
  const handleExpandClick = (i) => {
    setExpanded(!expanded);
    setId(i);
  };
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || ""
    );
    const [data, setData] = useState([]);
  
    const addComment = async (object) => {
      if (comment !== "") {
        axios
        .put(`http://localhost:3000/api/feed/${object._id}`, {
          comments: [...object.comments, { _id: user._id, comment: comment }],
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
        setComment("");
      }
      callme(3);
    };
    
    useEffect(() => {
      callme(3);
    }, []);
    
    const fetchMoreData = () => {
      setTimeout(() => {
        setlimit(limit + 3);
        callme(limit + 3);
      }, 1000);
    };
    
    const callme = async (i) => {
      axios
      .get(`http://localhost:3000/api/feed?limit=${i}`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.results);
      })
      .catch((err) => {
        alert("Access Denied");
        localStorage.removeItem("token");
        navigate("/login");
      });
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData2(res.data))
      .catch((e) => console.log(e));
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split("")[0][0]}${name.split("")[1][0]}`,
    };
  }

  const likes = async (obj) => {
    const ids = JSON.parse(localStorage.getItem("user"))._id;
    let l = obj.likes;
    if (l.includes(ids)) {
      l = l.filter((like) => like != ids);
      obj.likes = l;
    } else {
      obj.likes.push(ids);
    }
    data.map((post) => (post._id === obj._id ? (post = obj) : ""));
    setData(JSON.parse(JSON.stringify(data)));
    axios
      .put(`http://localhost:3000/api/feed/likes/${obj._id}`, {
        likes: obj.likes,
      })
      .then((res) => console.log(res.data));
    console.log(obj.likes);
  };
  useEffect(() => {
    console.log(data2);
  }, [data2]);
  function myFunction() {
    console.log("call");
  }
  useEffect(() => {
    window.addEventListener("scrollX", myFunction);
  }, []);
  // function loading(){
  //   return  (          );
  // }
  return (
    <Container onScroll={myFunction}>
      <Header />
      <Card
        sx={{
          marginRight: "1%",
          marginTop: 3,
          width: "20%",
          padding: 2,
          fontSize: 20,
        }}
        onClick={() => navigate("/AddFeed")}
      >
        <center>
        <Button variant="outlined" size="large">
          + Create Post
        </Button>
        </center>
      </Card>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <>
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              spacing={10}
            >
              <Grid item md={4}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="40%" />
                  <Skeleton
                    sx={{ height: 190 }}
                    animation="wave"
                    variant="rectangular"
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="40%" />
                  <Skeleton
                    sx={{ height: 190 }}
                    animation="wave"
                    variant="rectangular"
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                  }}
                >
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="40%" />
                  <Skeleton
                    sx={{ height: 190 }}
                    animation="wave"
                    variant="rectangular"
                  />
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </Box>
              </Grid>
            </Grid>
          </>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          spacing={3}
        >
          {data &&
            data.map((obj, index) => {
              return (
                <Grid item md={4} key={obj._id}>
                  <Card sx={{ marginRight: "1%", marginTop: 3 }} key={index}>
                    <CardHeader
                      avatar={data2.map((d) =>
                        d._id === obj.userId && d.profile !== "" ? (
                          <Avatar
                            src={require(`../../../../Node/images/Profile/${d.profile}`)}
                          />
                        ) : d._id === obj.userId && d.profile === "" ? (
                          <Avatar {...stringAvatar(obj.userfirstName)} />
                        ) : (
                          ""
                        )
                      )}
                      title={<h3>{obj.userfirstName}</h3>}
                    ></CardHeader>

                    <CardContent>
                      <img
                        src={require(`../../../../Node/images/${obj.image}`)}
                        alt="Trulli"
                      />
                      {/* <Typography gutterBottom variant="" component="div"> */}
                      <h2>{obj.title}</h2>
                      {/* </Typography> */}
                    </CardContent>
                    <CardActions>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => likes(obj)}
                      >
                        <FavoriteIcon
                          color={obj.likes.includes(user._id) ? "primary" : ""}
                        />
                        <h6>{obj.likes.length}</h6>
                      </IconButton>
                      <ExpandMore
                        expand={expanded && index === id}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <IconButton aria-label="add to favorites">
                          <CommentIcon />
                        </IconButton>
                      </ExpandMore>
                      <IconButton
                        aria-label="add to favorites"
                        style={{ marginLeft: -20 }}
                      >
                        <h6>{obj.comments.length}</h6>
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={expanded && index === id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph>Comment:</Typography>
                        <TextField
                          required
                          size="small"
                          id="fname"
                          type="text"
                          error={false}
                          placeholder="Comment"
                          name="fname"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          autoComplete="fname"
                          autoFocus
                          sx={{ minWidth: "80%", textAlign: "center" }}
                        />
                        <IconButton
                          aria-label="add to favorites"
                          onClick={() => addComment(obj)}
                        >
                          <ArrowCircleRightIcon />
                        </IconButton>

                        <Link onClick={() => setViewComments(true)}>
                          View Comments
                        </Link>

                        <Collapse
                          in={viewComments && index === id}
                          timeout="auto"
                          unmountOnExit
                        >
                          {obj.comments.map((c, i) => (
                            <List
                              sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                              }}
                              key={c._id}
                            >
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  {data2.map(
                                    (d) =>
                                      d._id === c._id && (
                                        <Avatar
                                          {...stringAvatar(d && d.firstName)}
                                        />
                                      )
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={data2.map(
                                    (d) => d._id === c._id && d.firstName
                                  )}
                                  secondary={
                                    <React.Fragment>
                                      <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {c.comment}
                                      </Typography>
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </List>
                          ))}
                        </Collapse>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}

export default Feed;
