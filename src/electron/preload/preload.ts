import { ipcRenderer } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector:any, text:any) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
    }

    for(const dependency of ['chrome', 'node', 'electron']) {
      	replaceText(`${dependency}-version`, process.versions[dependency])
    }
	
	let save_game_button = document.querySelector('#save-game')
	save_game_button?.addEventListener('click', () => {
		let game_save_data_element = document.querySelector('#game-save-data')
		console.log('game_save_data_element', game_save_data_element)
		if(!game_save_data_element) {
			console.log('Could not find game save data.')
			return
		}
		ipcRenderer.send('game:save', game_save_data_element.textContent)
	})
})
