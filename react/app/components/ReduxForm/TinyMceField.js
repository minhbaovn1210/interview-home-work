/**
 *
 * TinyMceField
 *
 */

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Editor } from '@tinymce/tinymce-react';

import ErrorMessages from 'components/FormElements/ErrorMessages';
import Label from 'components/FormElements/Label';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import colorConfig from 'config/style';

const Wrapper = styled.div`
  .mce-tinymce {
    box-shadow: none;
    ${(props) =>
      props.error && // eslint-disable-line
      css`
        border: 1px solid ${colorConfig.error};
      `};
  }
`;

const tinyMceBaseConfig = {
  theme: 'modern',
  statusbar: false,
  height: 300,
  plugins: [
    'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
    'save table contextmenu directionality emoticons template paste textcolor',
  ],
  toolbar:
    'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
};

const TinyMceField = ({
  customConfig = {},
  locale,
  input,
  meta,
  label,
  isRequired,
  infoTooltip,
  height,
  ...props
}) => {
  const tinyMceConfig = {
    language: locale,
    // api key: cmko9b7234ndcy1q3e7o9o6g906bszraa2xadorxvynukjsy
    ...tinyMceBaseConfig,
    ...customConfig,
  };

  if (height) {
    tinyMceConfig.height = height;
  }

  return (
    <Wrapper error={(meta.touched || meta.submitFailed) && meta.error}>
      <Label
        label={label}
        isRequired={isRequired}
        infoTooltip={infoTooltip}
        style={{ marginBottom: 10 }}
      />
      <Editor
        {...input}
        init={tinyMceConfig}
        onEditorChange={input.onChange}
        cloudChannel="dev"
        apiKey="cmko9b7234ndcy1q3e7o9o6g906bszraa2xadorxvynukjsy"
        {...props}
      />
      <ErrorMessages
        error={(meta.touched || meta.submitFailed) && meta.error}
      />
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

TinyMceField.propTypes = {
  customConfig: PropTypes.object,
  locale: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  height: PropTypes.any,

  // props for Label
  label: PropTypes.any,
  isRequired: PropTypes.bool,
  infoTooltip: PropTypes.string,
  error: PropTypes.string,
};

export default connect(mapStateToProps)(TinyMceField);
