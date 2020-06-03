import React from 'react'
import PropTypes from 'prop-types'
import {Map, List} from 'immutable'

import Icon from '../Icon'
import Infotip from '../Infotip'

class PropertyInfo extends React.Component {

	errorMessage(error){
		if (typeof error === 'string') return error
		//console.log('errorMessage:',error)
		if (Map.isMap(error) || List.isList(error)){
			let message = ''
			error.keySeq().toArray().forEach((key)=>{
				message += key+': '+this.errorMessage(error.get(key))
			})
			return message
		}
	}
	
	render(){
		const {doc, error} = this.props

		//console.log('error:',error)

		if (error !== null && error !== undefined) return (
			<span className="helper-icon infotip-trigger">
				<Icon 
					className="text-danger" 
					icon={'alert'} 
					ref={ref => {this.errorIcon = ref}} 
					weight={'solid'}
				/>
				<Infotip direction={'y'} message={this.errorMessage(error)}/>
			</span>
		)
		if (doc) return (
			<span className="helper-icon infotip-trigger">
				<Icon 
					className="text-muted"
					icon={'info'}
					ref={ref => {this.icon = ref}}
				/>
				<Infotip direction={'y'} message={doc}/>					
			</span>
		)
		return <span/>
	}
}

PropertyInfo.propTypes = {
	doc: PropTypes.string,
	error: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	])
}

export default PropertyInfo