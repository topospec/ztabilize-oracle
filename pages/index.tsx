import React from "react";
import ResponsiveAppBar from "../components/Navbar";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import Chart from "../components/Chart";
import { CaretRight } from "@phosphor-icons/react";

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Grid container spacing={3} padding={5}>
        <Grid item xs={12} md={4}>
          <Card>
            <Box
              width={"100%"}
              height={"100%"}
              minHeight={"350px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
              paddingTop={"10px"}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                paddingLeft={2}
                paddingRight={2}
                alignItems={"center"}
              >
                <Avatar src="/images/ztoken.png" />

                <Box width={"85%"}>
                  <Typography
                    fontSize={"18px"}
                    fontFamily={"Merriweather"}
                    fontWeight={600}
                    display={"flex"}
                    gap={"5px"}
                    alignItems={"center"}
                  >
                    UVA Token Price
                    <CaretRight />
                    <Typography fontFamily={"Merriweather"} fontWeight={400}>
                      $UVAZ
                    </Typography>
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    fontFamily={"Merriweather"}
                    fontWeight={300}
                    color={"gray"}
                  >
                    11/08/2024
                  </Typography>
                </Box>
              </Box>
              {/* <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                paddingLeft={2}
                paddingRight={2}
                alignItems={"center"}
              >
                <Avatar src="/images/usdt.png" />

                <Box width={"85%"}>USDT Price: 1070,16</Box>
              </Box> */}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Chart />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

// export async function getStaticProps() {
//     const allPostsData = getSortedPostsData();
//     return {
//       props: {
//         allPostsData,
//       },
//     };
//   }
