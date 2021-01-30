import React, { Component } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart, BarChart } from "react-native-chart-kit";
import { styles } from './config/styles';
import { IpAddress, XAccessToken } from './config/constants';
import { default as NumberFormat } from 'react-number-format';
const screenWidth = Dimensions.get("window").width;


export default class Home extends Component {
    
    constructor(props) {

        super(props);

        this.state = {
            totalCases: 'loading...'
        };
    }


    componentDidMount () {
        this.getData();
    }

    getData = async () =>{

        fetch(IpAddress+'summary', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': XAccessToken
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log('=========')
            // console.log(responseJson.Global);

            this.setPageData(responseJson.Global);
      
        })
        .catch((error) => {
          console.log(error)
        });
    }


    setPageData(data) {
        const { NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered } = data;
        this.setState({
            newCases:   NewConfirmed,
            totalCases: TotalConfirmed,
            newDeaths:  NewDeaths,
            totalDeaths: TotalDeaths,
            newRecovered: NewRecovered,
            totalRecovered: TotalRecovered

        })
    }


 
    render() {

        const { container, homePageIntroText, cardCases, cardCasesLeft, cardCasesRight, homePageBarChart, searchByCountryButtonSection, searchByCountryText, generalCasesFont, deathFont, recoveredFont } = styles;

        const data = {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43]
              }
            ]
        };

        return (

            <SafeAreaView style={ container }>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <View style={ homePageIntroText }>
                        <Text>Daily New Cases for past week</Text>
                    </View>


                    <BarChart
                        style={ homePageBarChart }
                        data={data}
                        width={screenWidth}
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                            backgroundColor: "#5382B2",
                            backgroundGradientFrom: "#5382B2",
                            backgroundGradientTo: "#5382B2",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                            borderRadius: 16
                            },
                            propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                            }
                        }}
                        verticalLabelRotation={30}
                    />





                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Cases</Text>

                            <NumberFormat 
                                value={this.state.totalCases} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ generalCasesFont }>{formattedValue}</Text> }
                            />

                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Cases</Text>
                            <NumberFormat 
                                value={this.state.newCases} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ generalCasesFont }>{formattedValue}</Text> }
                            />
                        </View>
                    </View>




                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Deaths</Text>
                            <NumberFormat 
                                
                                value={this.state.totalDeaths} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ deathFont }>{formattedValue}</Text> }
                            />
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Deaths</Text>
                            <NumberFormat 
                                value={this.state.newDeaths} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ deathFont }>{formattedValue}</Text> }
                            />
                        </View>
                    </View>






                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Recovered</Text>
                            <NumberFormat 
                                value={this.state.totalRecovered} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ recoveredFont }>{formattedValue}</Text> }
                            />
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Recovered</Text>
                            <NumberFormat 
                                value={this.state.newRecovered} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ recoveredFont }>{formattedValue}</Text> }
                            />
                        </View>
                    </View>




                    <View>
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Countries') } style={ searchByCountryButtonSection }>
                            <Text style= { searchByCountryText}> Search By Country</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </SafeAreaView>
        );
    }
};