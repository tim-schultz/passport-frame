/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

import { createWalletClient, http, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

import onchaininfo from "../deployments/onchainInfo.json"
import decoderAbi from "../deployments/abi/GitcoinPassportDecoder.json"


const CONTRACT = process.env.CONTRACT_ADDRESS as `0x` || ""

const account = privateKeyToAccount(("0x5b467aaa56146aab4713628282bdcd3fa3a96057c893cf4df9fdbbc66779d1ce"/* process.env.PRIVATE_KEY */ as `0x`) || "");

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http("https://opt-mainnet.g.alchemy.com/v2/mhPB_oK3lOJdIg4YHY5n-kQF7OpqWYAo" /* process.env.ALCHEMY_URL */),
});

const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http("https://opt-mainnet.g.alchemy.com/v2/mhPB_oK3lOJdIg4YHY5n-kQF7OpqWYAo" /* process.env.ALCHEMY_URL */),
});

async function getScore(address: any) {
  try {
    const score = await publicClient.readContract({
      address: onchaininfo["0xa"].GitcoinPassportDecoder.address,
      abi: [{"inputs":[{"internalType":"uint64","name":"expirationTime","type":"uint64"}],"name":"AttestationExpired","type":"error"},{"inputs":[],"name":"AttestationNotFound","type":"error"},{"inputs":[],"name":"EmptyProvider","type":"error"},{"inputs":[{"internalType":"string","name":"provider","type":"string"}],"name":"ProviderAlreadyExists","type":"error"},{"inputs":[{"internalType":"uint256","name":"score","type":"uint256"}],"name":"ScoreDoesNotMeetThreshold","type":"error"},{"inputs":[],"name":"ZeroMaxScoreAge","type":"error"},{"inputs":[],"name":"ZeroThreshold","type":"error"},{"inputs":[],"name":"ZeroValue","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"easAddress","type":"address"}],"name":"EASSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"maxScoreAge","type":"uint256"}],"name":"MaxScoreAgeSet","type":"event"},{"anonymous":false,"inputs":[],"name":"NewVersionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string[]","name":"providers","type":"string[]"}],"name":"ProvidersAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"resolverAddress","type":"address"}],"name":"ResolverSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"schemaUID","type":"bytes32"}],"name":"SchemaSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"threshold","type":"uint256"}],"name":"ThresholdSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[{"internalType":"string[]","name":"providers","type":"string[]"}],"name":"addProviders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"providers","type":"string[]"}],"name":"createNewVersion","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentVersion","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eas","outputs":[{"internalType":"contract IEAS","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"attestationUID","type":"bytes32"}],"name":"getAttestation","outputs":[{"components":[{"internalType":"bytes32","name":"uid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"},{"internalType":"uint64","name":"revocationTime","type":"uint64"},{"internalType":"bytes32","name":"refUID","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getPassport","outputs":[{"components":[{"internalType":"string","name":"provider","type":"string"},{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"uint64","name":"time","type":"uint64"},{"internalType":"uint64","name":"expirationTime","type":"uint64"}],"internalType":"struct Credential[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"version","type":"uint32"}],"name":"getProviders","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getScore","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gitcoinResolver","outputs":[{"internalType":"contract IGitcoinResolver","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"isHuman","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxScoreAge","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"passportSchemaUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"providerVersions","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"string","name":"","type":"string"}],"name":"reversedMappingVersions","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"scoreSchemaUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_easContractAddress","type":"address"}],"name":"setEASAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gitcoinResolver","type":"address"}],"name":"setGitcoinResolver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint64","name":"_maxScoreAge","type":"uint64"}],"name":"setMaxScoreAge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_schemaUID","type":"bytes32"}],"name":"setPassportSchemaUID","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_schemaUID","type":"bytes32"}],"name":"setScoreSchemaUID","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_threshold","type":"uint256"}],"name":"setThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"threshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}],
      functionName: "getScore",
      args: ["0xeb2565982BDc5997a3D1A15d3527D231e92c4EA4"],
    });
    const readableBalance = Number(score);
    return readableBalance;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

const tokens = ['ETH', 'WARP', 'DEGEN'];
let currentIndex = 0;

app.frame('/', async (c) => {
  const { buttonValue, inputText, status } = c
  const token = inputText || buttonValue
  
  if (c.buttonValue === 'next') {
  currentIndex = (currentIndex + 1) % tokens.length;
  }

  const score: number = await getScore(account.address);
  console.log({score});

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {score && score > 0 ? "HUMAN" : "BOT"}
        </div>
      </div>
    ),
    intents: [
      // <TextInput placeholder="Enter custom fruit..." />,
      // <Button value="apples">Apples</Button>,
      // <Button value="oranges">Oranges</Button>,
      // <Button value="bananas">Bananas</Button>,
      <Button value="next">Feeling Lucky?</Button>,
      status === 'response' && <Button.Redirect location="https://app.uniswap.org/?chain=optimism">BUY & HODL</Button.Redirect>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
