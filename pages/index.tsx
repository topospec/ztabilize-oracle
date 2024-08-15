import React, { useEffect } from "react";
import ResponsiveAppBar from "../components/Navbar";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Chart from "../components/Chart";
import { ArrowSquareOut, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "@phosphor-icons/react";
import {
  CHAINLINK_INDEXER_ADDRESS,
  CHAINLINK_INDEXER_URL,
  DEPLOYED_ORACLE_ADDRESS,
  DEPLOYED_ORACLE_CHAIN,
  DEPLOYED_ORACLE_URL,
} from "../utils/constants";
import { ethers } from "ethers";
import { Analytics } from "@vercel/analytics/react";

const Home = () => {
  const today = new Date().toLocaleDateString("es-AR");
  const md = useMediaQuery("(min-width:900px)");

  const [uvaPrice, setUvaPrice] = React.useState("0.00");
  const [cerPrice, setCerPrice] = React.useState("0.00");
  const [inflation, setInflation] = React.useState("0.00");
  const [usdtPrice, setUsdtPrice] = React.useState("0.00");

  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");

  const oracleContract = new ethers.Contract(
    DEPLOYED_ORACLE_ADDRESS,
    [
      "function uva() view returns (uint256)",
      "function cer() view returns (uint256)",
      "function inflation() view returns (uint256)",
    ],
    provider
  );

  useEffect(() => {
    if (provider) {
      handleFetchUvaPrice();
    }
  }, [provider]);

  const handleFetchUvaPrice = async () => {
    if (!provider) return;
    try {
      // const uvaPrice = await oracleContract.uva();
      const [uva, cer, inflation] = await Promise.all([
        oracleContract.uva(),
        oracleContract.cer(),
        oracleContract.inflation(),
      ]);
      const parsedUvaPrice = ethers.formatUnits(uva, 18);
      const parsedCerPrice = ethers.formatUnits(cer, 18);
      const parsedInflation = ethers.formatUnits(inflation, 18);
      console.log("UVA: ", parsedUvaPrice);
      console.log("CER: ", parsedCerPrice);
      console.log("Inflation: ", parsedInflation);
      setUvaPrice((+parsedUvaPrice).toFixed(2));
      setCerPrice((+parsedCerPrice).toFixed(2));
      setInflation((+parsedInflation).toFixed(2));
      await handleFetchUsdPrice();
    } catch (e) {
      console.error("Error fetching UVA Price: ", e);
    }
  };

  useEffect(() => {
    if (uvaPrice) {
      handleFetchUsdPrice();
    }
  }, [uvaPrice]);

  const handleFetchUsdPrice = async () => {
    try {
      const usdPrice = await fetch("https://criptoya.com/api/USDT/ARS/1");
      const res = await usdPrice.json();
      const price = res?.lemoncash?.ask;
      const parsedPrice = parseFloat(uvaPrice) / price;
      setUsdtPrice(parsedPrice.toFixed(2));
    } catch (e) {
      console.error("Error fetching USD Price: ", e);
    }
  };

  return (
    <div>
      <Analytics />
      <ResponsiveAppBar />
      <Grid container spacing={3} padding={md ? 5 : 2}>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.1)",
              minHeight: "350px",
            }}
          >
            <Box
              width={"100%"}
              height={"100%"}
              minHeight={"425px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"25px"}
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
                    {/* <CaretRight /> */}
                    BCRA Data Feed
                    <CaretRight />
                    {/* <Typography fontFamily={"Merriweather"} fontWeight={400}>
                    </Typography> */}
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    fontFamily={"Merriweather"}
                    fontWeight={300}
                    color={"gray"}
                  >
                    {today}
                  </Typography>
                </Box>
              </Box>
              <Box
                width={"100%"}
                height={"70%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
              >
                <Typography
                  fontFamily={"Merriweather"}
                  fontWeight={600}
                  fontSize={"36px"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={200}
                    color={"gray"}
                    fontSize={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    UVA
                    <CaretRight />
                  </Typography>
                  {uvaPrice}
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={200}
                    color={"gray"}
                    fontSize={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    ARS
                    <Image
                      alt="ars"
                      src="/images/ars.png"
                      width={20}
                      height={20}
                    />
                  </Typography>
                </Typography>
                {/* ... */}
                <Typography
                  fontFamily={"Merriweather"}
                  fontWeight={600}
                  fontSize={"36px"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={200}
                    color={"gray"}
                    fontSize={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    UVA
                    <CaretRight />
                  </Typography>
                  {usdtPrice}
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={200}
                    color={"gray"}
                    fontSize={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    USDT
                    <Image
                      alt="ars"
                      src="/images/usdt.png"
                      width={20}
                      height={20}
                    />
                  </Typography>
                </Typography>
                {/* ... */}
                <Typography
                  fontFamily={"Merriweather"}
                  fontWeight={600}
                  fontSize={"36px"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={200}
                    color={"gray"}
                    fontSize={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    CER
                    <CaretRight />
                  </Typography>
                  {cerPrice}
                </Typography>
                {/* .... */}
                <Typography
                  fontFamily={"Merriweather"}
                  fontWeight={600}
                  fontSize={"36px"}
                  display={"flex"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={200}
                    color={"gray"}
                    fontSize={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    Inflation
                    <CaretRight />
                  </Typography>
                  {inflation}
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={200}
                    color={"gray"}
                    fontSize={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"5px"}
                  >
                    %
                  </Typography>
                </Typography>
              </Box>
              {/* <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                <Chip
                  icon={<LinkIcon size={17} color="#0070F3" />}
                  onClick={() => window.open(DEPLOYED_ORACLE_URL, "_blank")}
                  variant="outlined"
                  label="Today Argentina Central Bank UVA price"
                  sx={{
                    paddingLeft: "5px",
                    fontFamily: "Merriweather",
                    fontWeight: 400,
                    fontSize: 12,
                  }}
                />
              </Box> */}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                padding={"15px"}
                gap={"10px"}
              >
                <Image
                  alt="ars"
                  src="/images/chainlink_token.png"
                  height={40}
                  width={40}
                />
                <Typography>
                  <Typography
                    fontFamily={"Merriweather"}
                    fontWeight={400}
                    color={"gray"}
                    fontSize={"13px"}
                  >
                    Powered by Chainlink
                  </Typography>
                  <Link href={"..."}>
                    <Typography
                      fontFamily={"Merriweather"}
                      fontSize={"12px"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      Learn more&nbsp;
                      <LinkIcon />
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.1)",
              minHeight: "425px",
            }}
          >
            <Box width={"100%"} height={"100%"} minHeight={"425px"}>
              <Chart />
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box width={"100%"} paddingLeft={md ? 5 : 2} paddingRight={md ? 5 : 2}>
        <Card
          variant="outlined"
          sx={{
            boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.1)",
            padding: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <Typography
            fontFamily={"Merriweather"}
            fontWeight={400}
            fontSize={"14px"}
          >
            <b>🔮&nbsp;UVA Oracle:</b>
            &nbsp;Explore real-time UVA price, sourced directly from the
            Argentine Central Bank and reliably indexed by our Chainlink oracle.
            Our platform ensures you have access to the latest UVA price,
            enabling informed decisions in your financial activities. Stay
            updated with Ztabilize and experience seamless integration of
            traditional financial data into the blockchain ecosystem.
          </Typography>
          <Typography
            fontFamily={"Merriweather"}
            fontWeight={400}
            fontSize={"14px"}
          >
            Index is updated everyday by chainlink automation service at 11:00
            GMT
          </Typography>
          <Typography
            fontFamily={"Merriweather"}
            fontWeight={400}
            fontSize={"14px"}
          >
            Feel free to implement our oracle in your smart contracts by reading
            the method <i>uvaPrice()</i> from the contract below:
          </Typography>
          <Typography
            fontFamily={"Merriweather"}
            fontWeight={400}
            fontSize={"14px"}
          >
            Controller:{" "}
            <Link href={DEPLOYED_ORACLE_URL}>
              {DEPLOYED_ORACLE_ADDRESS.substring(0, 4)}...
              {DEPLOYED_ORACLE_ADDRESS.substring(
                DEPLOYED_ORACLE_ADDRESS.length - 4,
                DEPLOYED_ORACLE_ADDRESS.length
              )}
            </Link>{" "}
            ({DEPLOYED_ORACLE_CHAIN})
          </Typography>
          <Typography
            fontFamily={"Merriweather"}
            fontWeight={400}
            fontSize={"14px"}
          >
            Oracle:{" "}
            <Link href={CHAINLINK_INDEXER_URL}>
              {CHAINLINK_INDEXER_ADDRESS.substring(0, 4)}...
              {CHAINLINK_INDEXER_ADDRESS.substring(
                CHAINLINK_INDEXER_ADDRESS.length - 4,
                CHAINLINK_INDEXER_ADDRESS.length
              )}
            </Link>{" "}
            ({DEPLOYED_ORACLE_CHAIN})
          </Typography>
        </Card>
      </Box>
    </div>
  );
};

export default Home;
