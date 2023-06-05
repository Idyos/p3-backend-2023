import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: {
    nick: "javiGAMO",
    admin: true,
    fullName: "Javi Gauxachs Monserrat"
  }
});

const match = await prisma.match.create({
  data: {
    name: "Test",
    userId: user.id
  }
})

await prisma.team.createMany({
  data: [{
    name: "Dream Team",
    matchId: match.id
  },
  {
    name: "N.1",
    matchId: match.id
  }
]
})

await prisma.set.createMany({
  data: [
    {
      matchId: match.id,
      team1Result: 6,
      team2Result: 2,
    },
    {
      matchId: match.id,
      team1Result: 4,
      team2Result: 6,
    },
    {
      matchId: match.id,
      team1Result: 7,
      team2Result: 5
    }
  ]
})