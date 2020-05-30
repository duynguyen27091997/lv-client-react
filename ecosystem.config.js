module.exports = {
  apps : [{
	name: "clienmallcode",	  
    	script: "serve -s build -l 3001",
    	watch: true,
	max_memory_restart: "1G",
	autorestart: true
  }]
};
