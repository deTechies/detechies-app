Welcome to our innovative platform that revolutionizes career authentication through the use of NFTs.

Overview
In today's rapidly digitizing world, proving one's achievements, memberships, and milestones is crucial. Our solution allows users to represent these achievements as NFTs. By requesting the minting of NFTs, users can have their accomplishments authenticated and, upon approval, can collect these digital representations. We have also created a way for community groups to issue these NFTs, thereby nurturing a robust Web3 business networking ecosystem.

Key Features
Group Contracts
Community groups can gather authenticated members and issue NFTs. This fosters trust and verification within a community, ensuring that members' achievements are genuine.

Project Contracts
These are open for all users to create and join. Once part of a project contract, users can request performance NFTs from both community and company groups, enhancing the breadth of their professional portfolio.

Bulk Minting
Why request one NFT when you can request many? Our system allows users to batch their achievements, and upon approval, mint and collect multiple NFTs, streamlining the process.

Tech Stack Overview
Frontend: Developed using the powerful React framework, ensuring a responsive and intuitive user interface.
Blockchain: We've harnessed the Ethereum blockchain, utilizing the ERC-6551 standard for our NFTs. This ensures security, transparency, and compatibility.
Data Querying: With Subgraph, we make data querying efficient and effective, allowing users to seamlessly access and interact with their NFTs and contracts.


# Technologies used
## The Graph 
We heavily rely on the graph for integrating all indexing of on-chain data we build two graph that indexed: 
### Groups
Groups [api](https://api.studio.thegraph.com/query/49385/groups/version/latest) [repository](https://github.com/Projectzenn/groupsGraph)
[Group Registry](https://mumbai.polyscan.com/address/0x81552b688eeE0b1daBeEc3e9b6a45ff2FF062e05) 
[Group Regstry Contract link]([https://repository-link](https://github.com/Projectzenn/contracts/blob/main/src/GroupRegistry.sol))
[Group Contract](https://contract-link) - 
[Achievements](https://contract-link) - [Repository link](https://repository-link)



### Projects
[Project api](https://api.studio.thegraph.com/query/49385/projects/version/latest)
[Projects repositry](https://github.com/Projectzenn/projectGraph)
[Projects Registry](https://contract-link)
[Project Contract](https://contract-link)

## Push Protocol
### Push Chat
We use push protocol chats for  three different occassions: 
- individual chat: for users to chat to eachother based on someone career status
- group chat: chat for people that are in the same group: everyone that hold that token they are able to enter the groupchat and start chatting to each other. This can be used to collectively decide on new achievement design, requirements or the acceptance of new users 
- project chat: token based access to the project chat for all the users that hold the ERC721 token of the project. 

### Push Notification:
Within the project the members of the Project are able to setup notification channels for updates about  newly added members, new achievements received or work uploaded. 
The group admin is able to setup the notification based to select or unselect any of the three selections above. If this select will be widely used by the users we are able to set up the some logic for groups to receive notification based on important changes.  

## Polybase
For our backend solution we use polybase to integrate offchain requests that needs to be validated by project owners or groups owners first, we do this to reduce the gas usage of users. Most of the gas costs are covered by the contract owners, this provide an easier way for users to start using and testing the application. 
