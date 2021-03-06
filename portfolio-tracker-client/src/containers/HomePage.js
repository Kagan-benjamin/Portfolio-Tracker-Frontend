import React from 'react';
import HomeIndex from '../components/HomeIndex.js'
import IndexSearch from '../components/IndexSearch.js'
import NavBar from './NavBar.js'

class HomePage extends React.Component {

    state = {
        indexStocks: [],
        indexSummary: []
    }

    componentDidMount() {
        this.fetchStocks()
        this.fetchIndices()
    }

    fetchStocks() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=MSFT%252CAAPL%252CAMZN%252CFB%252CJNJ%252CGOOG%252CV%252CJPM%252CPG%252CINTC%252CVZ%252CUNH%252CMA%252CT%252CHD%252CMRK%252CPFE%252CDIS%252CPEP%252CKO%252CBAC%252CXOM%252CWMT%252CCSCO%252CCMCSA%252CNFLX%252CNVDA%252CCVX%252CADBE%252CABT%252CCOST%252CBMY%252CMCD%252CCRM%252CMDT%252CAMGN%252CLLY%252CTMO%252CPYPL%252CPM%252CNEE%252CABBV%252CWFC%252CORCL%252CNKE%252CACN%252CIBM%252CUNP%252CC%252CHON%252CLIN%252CAVGO%252CTXN%252CRTX%252CDHR%252CGILD%252CLMT%252CSBUX%252CMMM%252CQCOM%252CBA%252CCVS%252CFIS%252CMO%252CMDLZ%252CCHTR%252CLOW%252CSPGI%252CUPS%252CCAT%252CCCI%252CCME%252CCI%252CPLD%252CD%252CBDX%252CDUK%252CINTU%252CAXP%252CVRTX%252CSO%252CGE%252CADP%252CANTM%252CZTS%252CCL%252CAGN%252CBKNG%252CTJX%252CSYK%252CGS%252CEQIX%252CISRG%252CBIIB%252CFISV%252CAMD%252CBLK%252CCB%252CUSB%252CTGT%252CNOC%252CNOW%252CBSX%252CMU%252CCSX%252CMMC%252CICE%252CTFC%252CAPD%252CMS%252CPGR%252CNEM%252CITW%252CATVI%252CPNC%252CDE%252CAMAT%252CHUM%252CGPN%252CKMB%252CECL%252CAON%252CEW%252CBAX%252CDG%252CAEP%252CILMN%252CLHX%252CSCHW%252CNSC%252CREGN%252CSHW%252CMCO%252CWM%252CDLR%252CCNC%252CCOP%252CEXC%252CLRCX%252CSRE%252CEL%252CADI%252CADSK%252CGIS%252CXEL%252CSBAC%252CETN%252CWBA%252CGD%252CROP%252CALL%252CTMUS%252CROST%252CEMR%252CBK%252CPSA%252CEA%252CWEC%252CDD%252CGM%252CCTSH%252CKMI%252CED%252CES%252CFDX%252CHCA%252CTRV%252CCOF%252CAFL%252CSTZ%252CMET%252CPSX%252CDOW%252CPEG%252CMSCI%252CINFO%252CMSI%252CEOG%252CORLY%252CEBAY%252CSYY%252CWLTW%252CKR%252CTROW%252CYUM%252CAPH%252CA%252CEQR%252CVRSK%252CFE%252CTEL%252CKLAC%252CAWK%252CHPQ%252CJCI%252CPRU%252CAVB%252CIQV%252CCLX%252CPCAR%252CCMI%252CMNST%252CAIG%252CPPG%252CWELL%252CBLL%252CSLB%252CRMD%252CZBH%252CAZO%252CSTT%252CIDXX%252CMAR%252CTT%252CEIX%252CMCK%252CCERN%252CTWTR%252CHSY%252CDTE%252CALXN%252CPAYX%252CADM%252CSPG%252CF%252CXLNX%252CCTVA%252CVLO%252CPPL%252CETR%252CANSS%252CSNPS%252CVRSN%252CCDNS%252CWMB%252COTIS%252CCMG%252CO%252CVFC%252CROK%252CARE%252CHLT%252CFLT%252CAEE%252CFAST%252CMKC%252CMCHP%252CPH%252CDLTR%252CSWK", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		    "x-rapidapi-key": "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
	    }
        })
        .then(response => response.json())
        .then(data => this.setState({
            indexStocks: data.quoteResponse.result
        }))
    }

    fetchIndices() {
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		    "x-rapidapi-key": "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
	    }
        })
        .then(response => response.json())
        .then(data => this.setState({
            indexSummary: data.marketSummaryResponse.result
        }))
    }

    refreshStocks(e) {
        e.preventDefault()
        fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=MSFT%252CAAPL%252CAMZN%252CFB%252CJNJ%252CGOOG%252CV%252CJPM%252CPG%252CINTC%252CVZ%252CUNH%252CMA%252CT%252CHD%252CMRK%252CPFE%252CDIS%252CPEP%252CKO%252CBAC%252CXOM%252CWMT%252CCSCO%252CCMCSA%252CNFLX%252CNVDA%252CCVX%252CADBE%252CABT%252CCOST%252CBMY%252CMCD%252CCRM%252CMDT%252CAMGN%252CLLY%252CTMO%252CPYPL%252CPM%252CNEE%252CABBV%252CWFC%252CORCL%252CNKE%252CACN%252CIBM%252CUNP", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		    "x-rapidapi-key": "baf3ec0ef6msh64ec318991109bfp13cd0cjsn50b9c68a5706"
	    }
        })
        .then(response => response.json())
        .then(data => this.setState({
            indexStocks: data.quoteResponse.result
        }))
    }

    // setStocks = (stocks) => {
    //     this.setState({
    //         indexStocks: stocks
    //     })
    // }

    render() {
        return (
            <div className="Homepage">
                <NavBar username={this.props.username} 
                noUser={this.props.noUser}
                />
                <IndexSearch refreshIndex={this.fetchStocks}
                indexSummary={this.state.indexSummary}
                />
                <HomeIndex indexStocks={this.state.indexStocks}
                indexSummary={this.state.indexSummary}
                />
            </div>
        );
    }
} 
export default HomePage;