import { Modal, ModalProps, View } from 'react-native';
import tw from 'twrnc';

type Props = ModalProps & {
    isOpen: boolean
}

const PopUp = ({isOpen, children, ...rest} : Props) => {
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...rest}
        >
            <View style={tw`justify-center items-center flex-1 px-3 bg-zinc-900/40`}>
                {children}
            </View>
        </Modal>
    )
}

export default PopUp;