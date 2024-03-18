import { TabsContent } from '@sb/webapp-core/components/tabs';
import { useGenerateLocalePath } from '@sb/webapp-core/hooks';

import { RoutesConfig } from '../../config/routes';
import { FederalForm } from '../../shared/components/certificates/federalForm/federalForm.component';

const FederalFormContent = () => {
  const generateLocalePath = useGenerateLocalePath();

  return (
    <TabsContent value={generateLocalePath(RoutesConfig.requestCertificate.federal)} className="py-8">
      <FederalForm />
    </TabsContent>
  );
};

export default FederalFormContent;
