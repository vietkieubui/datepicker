import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  // Modal,
} from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from 'react-native-wheel-pick';
import {
  day31Array,
  day30Array,
  day29Array,
  day28Array,
  monthArray,
  numberToString,
  yearArray,
  stringToNumber,
} from '../utils/dateArray';

export default function InforScreen() {
  const [modalShow, setModalShow] = useState(false);
  const [inforForm, setInforForm] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
  });
  const [bgColor, setBgColor] = useState('white');
  return (
    <>
      <View style={{ ...styles.container, backgroundColor: bgColor }}>
        <DatePickerModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          setInforForm={setInforForm}
          inforForm={inforForm}
          setBgColor={setBgColor}
        />
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <View style={styles.form}>
          <View style={styles.formItem}>
            <Text>
              <Text>Họ và tên </Text>
              <Text style={{ color: '#f00' }}>*</Text>
            </Text>
            <TextInput
              placeholder="Họ và tên"
              value={inforForm.name}
              onChange={name => setInforForm({ ...inforForm, name: name })}
              style={styles.textInput}
              inputContainerStyle={styles.inputContainerStyle}
            />
          </View>
          <View style={styles.formItem}>
            <Text>
              <Text>Email </Text>
            </Text>
            <TextInput
              keyboardType="email-address"
              value={inforForm.email}
              placeholder="Email"
              onChange={email => setInforForm({ ...inforForm, email: email })}
              style={styles.textInput}
              inputContainerStyle={styles.inputContainerStyle}
            />
          </View>
          <View style={styles.formItem}>
            <Text>
              <Text>Ngày sinh </Text>
            </Text>
            <View>
              <TextInput
                placeholder="Chọn ngày sinh"
                editable={false}
                style={styles.textInput}
                value={inforForm.dateOfBirth}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 13, top: 13 }}
                onPress={() => {
                  setModalShow(true);
                  setBgColor('gray');
                }}>
                <Image
                  source={require('../assets/icons/calendar.png')}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <Button color={'#f20a82'} title="Hủy bỏ" />
        </View>
      </View>
    </>
  );
}

const DatePickerModal = ({
  modalShow,
  setModalShow,
  inforForm,
  setInforForm,
  setBgColor,
}) => {
  const [initialDate, setinitialDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [selectedDate, setselectedDate] = useState(initialDate);
  const [selectedDayArray, setSelectedDayArray] = useState(day31Array);
  const onClose = () => {
    setModalShow(false);
  };
  useEffect(() => {
    switch (selectedDate.month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12: {
        setSelectedDayArray(day31Array);
        break;
      }
      case 4:
      case 6:
      case 9:
      case 11: {
        setSelectedDayArray(day30Array);
        break;
      }
      case 2: {
        if (
          (selectedDate.year % 4 == 0 && selectedDate.year % 100 != 0) ||
          selectedDate.year % 400 == 0
        ) {
          setSelectedDayArray(day29Array);
          break;
        } else {
          setSelectedDayArray(day28Array);
          break;
        }
      }
      default:
        reuturn;
    }
  }, [selectedDate]);
  const handleMonthChange = month => {
    setselectedDate({ ...selectedDate, month: month });
  };
  const handleDayChange = day => {
    setselectedDate({ ...selectedDate, day: day });
  };
  const handleYearChange = year => {
    setselectedDate({ ...selectedDate, year: year });
  };
  const onSubmit = () => {
    setInforForm({
      ...inforForm,
      dateOfBirth: `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`,
    });
    setBgColor('white');
    setModalShow(false);
  };
  return (
    <Modal visible={modalShow} onDismiss={onClose} onBackButtonPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Date of Birth</Text>
        <View style={styles.datePickerGroup}>
          <Picker
            style={{ backgroundColor: 'white', width: 50, height: 200 }}
            selectedValue={initialDate.day.toString()}
            textSize={20}
            pickerData={selectedDayArray}
            onValueChange={day => handleDayChange(day)}
          />
          <Picker
            style={{ backgroundColor: 'white', width: 200, height: 200 }}
            selectedValue={numberToString(initialDate.month)}
            textSize={20}
            pickerData={monthArray}
            onValueChange={month => handleMonthChange(stringToNumber(month))}
          />
          <Picker
            style={{ backgroundColor: 'white', width: 75, height: 200 }}
            selectedValue={initialDate.year.toString()}
            textSize={20}
            pickerData={yearArray}
            onValueChange={year => handleYearChange(year)}
          />
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: '500',
              color: 'red',
            }}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    padding: 10,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 25,
    fontWeight: '400',
  },
  datePickerGroup: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  datePickerItem: {
    fontSize: 10,
    height: 30,
    backgroundColor: 'gray',
    alignItems: 'center',
    maxWidth: 100,
  },
  indexSelect: { textAlign: 'center' },
  container: {
    paddingTop: StatusBar.currentHeight,
    height: Dimensions.get('screen').height,
    zIndex: 1,
    // opacity: 0.5,
    // backgroundColor: 'gray',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
  },
  form: {
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  formItem: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  textInput: {
    marginTop: 2,
    paddingLeft: 10,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
  },
  inputContainerStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  button: {
    position: 'relative',
    margin: 20,
    top: '30%',
  },
});
