import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/node_modules/@material-ui/styles";
import {
  HighlightOffTwoTone,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  Replay,
  SkipNext,
} from "@material-ui/icons";
import ReplyIcon from "@material-ui/icons/Reply";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Stracture from "../../classes/structure";
import Logic from "../../classes/logic";
var _ = require("lodash");

const level_one_arr = [
  ["W", "W", "W", "W", "W", "W"],
  ["W", "B1", "E", "E", "T1", "W"],
  ["W", "W", "W", "W", "W", "W"],
];

const level_one = new Stracture([...level_one_arr]);
const logic = new Logic();

const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  patch: {
    display: "block",
    width: "fit-content",
    height: "fit-conteny",
    transition: "all 500ms",
  },
  box: {
    background: "url(/box.jpg) ",
    backgroundSize: "cover",
    width: 100,
    height: 100,
    fontSize: 25,
  },
  wall: {
    background: "url(/wall.jpg)",
    backgroundSize: "cover",
    width: 100,
    height: 100,
  },
  target: {
    background: "url(/target.svg)",
    backgroundSize: "cover",
    width: 100,
    height: 100,
  },
  empty: {
    background: "transparent",
    width: 100,
    height: 100,
  },
  row: {
    display: "flex",
  },
  btn: {
    fontSize: 70,
  },
  success: {
    fontSize: 70,
    color: green[500],
  },
  wrong: {
    fontSize: 70,
    color: red[500],
  },
  flex: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    background: "linear-gradient(45deg, #f50057 30%, #eea849 90%)",
    fontFamily: "Common Pixel , sans-serif ",
    WebkitBackgroundClip: "text",
    textFillColor: "transparent",
    marginTop: 30,
    textDecoration: "none",
  },
  winner: {
    fontSize: 200,
    fontFamily: " Nabla , cursive ",
  },
});

const Level1 = () => {
  logic.DFS(level_one);
  let [currArray, SetCurArray] = useState([...level_one.currArr]);
  let [winner, SetWinner] = useState(false);
  let [steps, setsteps] = useState(0);
  let [state, setState] = useState([[...level_one.patch]]);
  let [nextMove, SetNextMove] = useState([
    ...level_one.getNextMove(level_one.currArr),
  ]);
  const classes = useStyles();

  let moveHandelr = (dir) => {
    level_one.currArr = [...level_one.move(dir, currArray)];
    SetCurArray(level_one.currArr);
  };
  let getNextMoveHandelr = () => {
    SetNextMove(level_one.getNextMove(currArray));
  };
  let retry = () => {
    level_one.currArr = level_one.patch;
    level_one.boxes = _.cloneDeep(level_one.StaticBoxes);
    level_one.states = [level_one.patch];
    SetCurArray(level_one.currArr);
    setsteps(0);
    setState([level_one.patch]);
    SetWinner(false);
  };
  useEffect(() => {
    getNextMoveHandelr();
    //is Step
    if (level_one.isEqual(currArray, state[state.length - 1]) === false) {
      setsteps(steps + 1);
    }
    //is new State
    if (level_one.isNewState(currArray)) {
      level_one.states.push(currArray);
      setState([...state, currArray]);
    }
    // Is Final
    if (level_one.isEqual(currArray, level_one.finalArr) === true) {
      SetWinner(true);
    }
  }, [currArray]);

  useEffect(() => {
    console.log(logic.stack);
  }, [logic.stack]);

  return (
    <>
      <div className="div">
        <Grid container>
          <Grid xs={1} item>
            <IconButton>
              <NavLink className="nav_option" to="/home">
                <ReplyIcon
                  color="secondary"
                  className={classes.btn}
                  onClick={() => {
                    retry();
                  }}
                />
              </NavLink>
            </IconButton>
          </Grid>
          <Grid xs={10} item className={classes.title}>
            Level 1
            <IconButton
              color={"secondary"}
              onClick={() => {
                retry();
              }}
            >
              <Replay fontSize={"large"} />
            </IconButton>
          </Grid>
        </Grid>
        {winner ? (
          <>
            <Grid
              container
              className={classes.winner}
              justifyContent={"center"}
            >
              Winner
            </Grid>
            <Grid
              container
              className={classes.winner}
              justifyContent={"center"}
            >
              <Grid item>
                <Button
                  className={classes.title}
                  color={"secondary"}
                  onClick={() => {
                    retry();
                  }}
                  size="large"
                >
                  <NavLink className="nav_option" to="/level2">
                    next level
                  </NavLink>
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Container>
              <Grid container className={classes.container}>
                <Grid item>
                  <div className={classes.patch}></div>
                  {currArray?.map((row, i) => {
                    return (
                      <div className={classes.row}>
                        {row.map((ele, i) => {
                          if (ele === "W") {
                            return (
                              <Avatar
                                variant={"square"}
                                className={classes.wall}
                              >
                                {""}
                              </Avatar>
                            );
                          } else if (ele === "E") {
                            return (
                              <Avatar
                                variant={"square"}
                                className={classes.empty}
                              >
                                {""}
                              </Avatar>
                            );
                          } else if (ele[0] === "T") {
                            return (
                              <Avatar
                                variant={"rounded"}
                                className={classes.target}
                              >
                                {ele[1]}
                              </Avatar>
                            );
                          } else if (ele.length === 2 && ele[0] === "B") {
                            return (
                              <>
                                <Avatar
                                  variant={"rounded"}
                                  className={classes.box}
                                >
                                  {ele[1]}
                                </Avatar>
                              </>
                            );
                          } else if (ele.length === 4 && ele[1] === ele[3]) {
                            return (
                              <>
                                <Avatar
                                  variant={"rounded"}
                                  className={classes.box}
                                >
                                  <CheckCircleTwoToneIcon
                                    className={classes.success}
                                  />
                                </Avatar>
                              </>
                            );
                          } else if (ele.length === 4 && ele[1] !== ele[3]) {
                            return (
                              <>
                                <Avatar
                                  variant={"rounded"}
                                  className={classes.box}
                                >
                                  <HighlightOffTwoTone
                                    className={classes.wrong}
                                  />
                                </Avatar>
                              </>
                            );
                          }
                        })}
                        <br key={i} />
                      </div>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid xs={12} className={classes.flex} item>
                  <IconButton
                    color={"secondary"}
                    onClick={() => {
                      moveHandelr("top");
                    }}
                  >
                    <KeyboardArrowUp className={classes.btn} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    color={"secondary"}
                    onClick={() => {
                      moveHandelr("left");
                    }}
                  >
                    <KeyboardArrowLeft className={classes.btn} />
                  </IconButton>
                  <IconButton
                    color={"secondary"}
                    onClick={() => {
                      moveHandelr("down");
                    }}
                  >
                    <KeyboardArrowDown className={classes.btn} />
                  </IconButton>
                  <IconButton
                    color={"secondary"}
                    variant={"outlined"}
                    onClick={() => {
                      moveHandelr("right");
                    }}
                  >
                    <KeyboardArrowRight className={classes.btn} />
                  </IconButton>
                </Grid>
                {/* <Grid xs={12} item> */}
                {/* <Typography variant={'h4'} align={'center'} color={'secondary'}>Steps: {steps}</Typography> */}
                {/* </Grid> */}
              </Grid>
            </Container>
          </>
        )}
      </div>
    </>
  );
};

export default Level1;
