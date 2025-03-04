{/*import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
*/}

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-reanimated-table';


// Tipando o estado da classe
interface State {
  tableHead: string[];         // Array de cabeçalhos
  tableData: string[][];       // Array bidimensional de dados da tabela
}

export default class ExampleFour extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tableHead: ['Local', 'Material', 'Quantidade', 'Editar'],
      tableData: [
        ['B1 - Almox Cabos', '19217838', '28', 'Nothing'],
        ['B2 - Almox Comprados', '19217838', '3', 'Nothing'],
        ['B4 - DG', '19217838', '14', 'Nothing'],
        ['B6 - Fábrica VIII', '19217838', '25', 'Nothing'],
      ]
    };
  }

  // Tipando a função _alertIndex para receber um número como parâmetro
  _alertIndex(index: number): void {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;


    // Tipando a função `element` para aceitar parâmetros `data` e `index` com tipos adequados
    const element = (data: string, index: number): JSX.Element => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderColor: 'transparent' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
          {
            state.tableData.map((rowData: string[], index: number) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData: string, cellIndex: number) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: '1%',
    padding: 16,
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  head: {
    gap: 1,
    height: 40, 
    backgroundColor: '#808B97' 
  },
  text: { 
    margin: 6,
    fontSize: 18,
  },
  row: { 
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
  },
  btn: { 
    width: 58, 
    height: 18, 
    backgroundColor: '#78B7BB', 
    borderRadius: 2
  },
  btnText: {
    textAlign: 'center', 
    color: '#fff'
  }
});
