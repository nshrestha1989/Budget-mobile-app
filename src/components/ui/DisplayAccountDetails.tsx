
import React from 'react';
import {
  Navbar,
  Page,
  Popup,
  Block,
  NavRight,
  Link,
  Button,
  View,
} from 'framework7-react';

export default ({ cardType }:any) => {

  return (
    <>
        <Button fill popupOpen=".demo-popup-push " className='margin'>
          {cardType}
        </Button>      
      <Popup push className="demo-popup-push">
        <View>
          <Page>
            <Navbar title={cardType} large transparent>
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris
                leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac
                urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam
                lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit
                eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat
                nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque
                sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed
                porttitor. Suspendisse a faucibus lectus.
              </p>
              <p>
                Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit
                nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel,
                feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed
                molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros
                sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem,
                suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis
                faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing
                libero.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris
                leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac
                urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam
                lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit
                eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat
                nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque
                sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed
                porttitor. Suspendisse a faucibus lectus.
              </p>
            </Block>
          </Page>
        </View>
      </Popup>


    </>
  );
};