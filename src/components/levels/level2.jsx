import { Avatar, Button, Container, Grid, IconButton, makeStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Stracture from "../../classes/structure";
import ReplyIcon from "@material-ui/icons/Reply";
import { HighlightOffTwoTone, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Replay } from "@material-ui/icons";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";

var _ = require("lodash");

const level_two_arr = [
  ["W", "W", "W", "W", "W"  ],
  ["W", "B1", "W", "B2", "W" ],
  ["W", "E", "W", "E", "W" ],
  ["W", "E", "W", "E", "W" ],
  ["W", "T1", "W", "T2", "W" ],
  ["W", "W", "W", "W", "W" ],
];

const level_two = new Stracture([...level_two_arr]);
const useStyles = makeStyles({
  container:{
    justifyContent:'center',
    alignItems:'center',
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
    width: 80,
    height: 80,
    fontSize: 25,
  },
  wall: {
    background: "url(/wall.jpg)",
    backgroundSize: "cover",
    width: 80,
    height: 80,
  },
  target: {
    background: "url(/target.svg)",
    backgroundSize: "cover",
    width: 80,
    height: 80,
  },
  empty: {
    background: "transparent",
    width: 80,
    height: 80,
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
    textDecoration: 'none'
  },
  winner:{
    fontSize: 200,
    fontFamily: " Nabla , cursive ",
  }
});
const Level2 = () => {
  let [currArray, SetCurArray] = useState([...level_two.currArr]);
  let [winner, SetWinner] = useState(false);
  let [steps, setsteps] = useState(0);
  let [state, setState] = useState([[...level_two.patch]]);
  let [nextMove, SetNextMove] = useState([
    ...level_two.getNextMove(level_two.currArr),
  ]);

  const classes = useStyles();

  let moveHandelr = (dir) => {
    level_two.currArr = [...level_two.move(dir, currArray)];
    SetCurArray(level_two.currArr);
  };
  let getNextMoveHandelr = () => {
    SetNextMove(level_two.getNextMove(currArray));
  };
  let retry = () => {
    level_two.currArr = level_two.patch;
    level_two.boxes = _.cloneDeep(level_two.StaticBoxes);
    level_two.states = [level_two.patch];
    SetCurArray(level_two.currArr);
    setsteps(0);
    setState([level_two.patch]);
    SetWinner(false)
  };
  useEffect(() => {
    getNextMoveHandelr();
    //is Step
    if (level_two.isEqual(currArray, state[state.length - 1]) === false) {
      setsteps(steps + 1);
    }
    //is new State
    if (level_two.isNewState(currArray)) {
      level_two.states.push(currArray);
      setState([...state, currArray]);
    }
    // Is Final
    if (level_two.isEqual(currArray, level_two.finalArr) === true) {
      SetWinner(true);
    }
  }, [currArray]);

  return (
    <>
    <div className="div">
      <Grid container>
        <Grid xs={1} item>
          <IconButton>
            <NavLink className="nav_option" to="/home">
              <ReplyIcon color="secondary" className={classes.btn} onClick={()=>{retry()}}/>
            </NavLink>
          </IconButton>
        </Grid>
        <Grid xs={10} item className={classes.title}>
          Level 2
          <IconButton
            color={"secondary"}
            onClick={() => {
              retry();
            }}
          >
            <Replay fontSize={'large'} />
          </IconButton>
        </Grid>
      </Grid>
      {winner ? (
        <>
          <Grid container className={classes.winner} justifyContent={'center'}>
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
                  <NavLink className="nav_option" to="/level3">
                    next level
                  </NavLink>
                </Button>
              </Grid>
            </Grid>
        </>
      ) : (
        <>
          <Container>
            <Grid container className={classes.container} >
              <Grid item>
                <div className={classes.patch}></div>
                {currArray?.map((row, i) => {
                  return (
                    <div className={classes.row}>
                      {row.map((ele, i) => {
                        if (ele === "W") {
                          return (
                            <Avatar variant={"square"} className={classes.wall}>
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

export default Level2;
